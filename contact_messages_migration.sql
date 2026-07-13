-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger to update updated_at on row modification
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.contact_messages;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- RLS policy setup
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (authenticated or anonymous) to submit a contact message.
CREATE POLICY insert_contact_messages ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (
    (
      auth.uid() IS NOT NULL AND user_id = auth.uid()
    ) OR (
      auth.uid() IS NULL AND user_id IS NULL
    )
  );

-- No SELECT / UPDATE / DELETE policies are created for public or authenticated users.
-- This means anonymous and authenticated clients can insert messages,
-- but cannot read, update, or delete them through RLS.
