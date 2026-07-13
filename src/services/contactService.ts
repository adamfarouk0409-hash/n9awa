import { supabase } from "@/lib/supabase";
import type { ContactMessageInsert } from "@/types/contact";

export const contactService = {
  async submitMessage(input: ContactMessageInsert): Promise<void> {
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ ...input, status: input.status ?? "unread" }]);

    if (error) {
      throw new Error(error.message || "Une erreur est survenue lors de l'envoi du message.");
    }
  },
};
