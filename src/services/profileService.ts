import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET = "avatars";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const convertFileToWebp = async (file: File): Promise<File> => {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Impossible de préparer l'image pour l'envoi.");
  }

  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  context.drawImage(imageBitmap, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.92);
  });

  if (!blob) {
    throw new Error("Impossible de convertir l'image au format WebP.");
  }

  return new File([blob], "avatar.webp", { type: "image/webp" });
};

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
    const webpFile = await convertFileToWebp(file);
    const filePath = `${userId}/avatar.webp`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, webpFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/webp",
      });

    if (uploadError) {
      throw new Error(uploadError.message || "Impossible de télécharger l'image de profil.");
    }

    const urlResult = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    const avatarUrl = urlResult.data?.publicUrl;

    if (!avatarUrl) {
      throw new Error("Impossible de récupérer l'URL de l'image de profil.");
    }

    const { count, error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_path: filePath,
        avatar_updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (profileError) {
      throw new Error(profileError.message || "Impossible de mettre à jour l'avatar du profil.");
    }

    if (count === 0) {
      throw new Error("Aucun profil n'a été mis à jour pour l'utilisateur.");
    }

    return filePath;
  },
};
