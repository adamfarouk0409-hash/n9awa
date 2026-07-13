-- Enforce a 30-day avatar change restriction on public.profiles

-- 1) Enable row level security on profiles so policies can protect sensitive fields.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2) Allow authenticated users to update only their own profile row.
--    This policy protects profile updates at the row level and ensures
--    only the owner can attempt an UPDATE.
CREATE POLICY IF NOT EXISTS update_own_profiles ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 3) Trigger function that enforces the avatar update interval.
--    It protects both avatar_url and avatar_updated_at.
--    - If avatar_url changes, the previous avatar_updated_at must be NULL
--      or at least 30 days old.
--    - If avatar_url stays the same, avatar_updated_at cannot be changed.
CREATE OR REPLACE FUNCTION public.enforce_profile_avatar_update_limit()
RETURNS trigger AS $$
BEGIN
  IF NEW.avatar_url IS DISTINCT FROM OLD.avatar_url THEN
    IF OLD.avatar_updated_at IS NOT NULL
       AND OLD.avatar_updated_at > now() - interval '30 days' THEN
      RAISE EXCEPTION 'La photo de profil ne peut être modifiée qu\'une fois tous les 30 jours.';
    END IF;

    NEW.avatar_updated_at := now();
  ELSIF NEW.avatar_updated_at IS DISTINCT FROM OLD.avatar_updated_at THEN
    RAISE EXCEPTION 'Modification de avatar_updated_at interdite sans changement de photo.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4) Trigger to call the function only when avatar fields are modified.
DROP TRIGGER IF EXISTS enforce_avatar_update_limit ON public.profiles;
CREATE TRIGGER enforce_avatar_update_limit
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (OLD.avatar_url IS DISTINCT FROM NEW.avatar_url
        OR OLD.avatar_updated_at IS DISTINCT FROM NEW.avatar_updated_at)
  EXECUTE FUNCTION public.enforce_profile_avatar_update_limit();
