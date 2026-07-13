import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET = "avatars";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const profileService = {
  validateAvatarFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Le format doit être JPG, PNG ou WEBP.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "La taille maximale est de 5 Mo.";
    }
    return null;
  },

  getStoragePathFromPublicUrl(publicUrl: string) {
    try {
      const url = new URL(publicUrl)
      const path = decodeURIComponent(url.pathname)
      const prefix = `/storage/v1/object/public/${STORAGE_BUCKET}/`
      if (path.startsWith(prefix)) {
        return path.slice(prefix.length)
      }
    } catch {
      // fallback to manual parsing below
    }

    const prefix = `/storage/v1/object/public/${STORAGE_BUCKET}/`
    const index = publicUrl.indexOf(prefix)
    if (index === -1) return null
    const path = publicUrl.slice(index + prefix.length).split(/[?#]/)[0]
    return decodeURIComponent(path)
  },

  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message || "Impossible de télécharger l'image de profil.");
    }

    const { data: existingProfile, error: existingProfileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingProfileError) {
      throw new Error(existingProfileError.message || "Impossible de récupérer l'avatar existant.");
    }

    const currentAvatarUrl = existingProfile?.avatar_url as string | null
    if (currentAvatarUrl) {
      const existingPath = profileService.getStoragePathFromPublicUrl(currentAvatarUrl)
      if (existingPath) {
        const { error: deleteError } = await supabase
          .storage
          .from(STORAGE_BUCKET)
          .remove([existingPath])

        if (deleteError) {
          const message = deleteError.message || "Erreur lors de la suppression de l'ancienne photo."
          if (!/not found|404|n'existe pas|pas trouvé|No such file/i.test(message)) {
            throw new Error(message)
          }
        }
      }
    }

    const urlResult = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    const avatarUrl = urlResult.data?.publicUrl;

    if (!avatarUrl) {
      throw new Error("Impossible de récupérer l'URL de l'image de profil.");
    }

    const { count, error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
        avatar_updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (profileError) {
      throw new Error(profileError.message || "Impossible de mettre à jour l'avatar du profil.");
    }

    if (count === 0) {
      throw new Error("Aucun profil n'a été mis à jour pour l'utilisateur.");
    }

    return avatarUrl;
  },
};
