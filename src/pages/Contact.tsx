import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = "Veuillez saisir votre nom complet.";
    if (!email.trim()) nextErrors.email = "Veuillez saisir votre adresse e-mail.";
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) nextErrors.email = "Veuillez saisir une adresse e-mail valide.";
    if (!subject.trim()) nextErrors.subject = "Veuillez saisir un sujet.";
    if (!message.trim()) nextErrors.message = "Veuillez saisir un message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr]">
          <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-sm sm:p-10">
            <div className="max-w-2xl space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2678D1]">Contactez-nous</p>
                <h1 className="mt-4 text-4xl font-semibold text-[#1F2937] sm:text-5xl">Nous sommes là pour vous aider</h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                  L'équipe N9AWA est disponible pour répondre à vos questions, vous accompagner dans votre expérience et faciliter vos demandes de services.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 min-h-[220px] min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2678D1] shadow-sm">
                      <Phone size={20} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#1F2937]">Téléphone</p>
                  </div>
                  <a href="tel:+212605802324" className="mt-2 block break-words text-sm text-gray-600 hover:text-[#2678D1]">
                    +212 605802324
                  </a>
                </div>
                <div className="rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 min-h-[220px] min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2678D1] shadow-sm">
                      <Mail size={20} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#1F2937]">Email</p>
                  </div>
                  <a href="mailto:n9awa.ma@gmail.com" className="mt-2 block break-words text-sm text-gray-600 hover:text-[#2678D1]">
                    n9awa.ma@gmail.com
                  </a>
                </div>
                <div className="rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 min-h-[220px] min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2678D1] shadow-sm">
                      <Instagram size={20} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#1F2937]">Instagram</p>
                  </div>
                  <a href="https://www.instagram.com/n9awa_ma" target="_blank" rel="noreferrer" className="mt-2 block break-words text-sm text-gray-600 hover:text-[#2678D1]">
                    @n9awa_ma
                  </a>
                </div>
              </div>

            </div>
          </section>

          <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2678D1]">Formulaire de contact</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#1F2937]">Envoyez-nous un message</h2>
              <p className="mt-2 text-sm text-gray-600">Nous reviendrons vers vous rapidement.</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={24} />
                  <div>
                    <p className="font-semibold">Message envoyé !</p>
                    <p className="mt-1 text-sm text-emerald-700/90">Nous avons bien reçu votre demande et vous contacterons bientôt.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Nom complet</label>
                    <Input
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Votre nom"
                    />
                    {errors.fullName && <p className="mt-2 text-xs text-red-500">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Adresse e-mail</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="votre@email.ma"
                    />
                    {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Sujet</label>
                  <Input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Sujet de votre message"
                  />
                  {errors.subject && <p className="mt-2 text-xs text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Message</label>
                  <Textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Écrivez votre message ici..."
                  />
                  {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full rounded-full bg-[#2678D1] text-white hover:bg-[#1E85D6]">
                  Envoyer le message
                </Button>
              </form>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
