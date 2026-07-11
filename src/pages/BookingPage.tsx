import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarCheck, Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { DateTimeSelection } from "@/components/booking/DateTimeSelection";
import { AddressForm, type AddressData } from "@/components/booking/AddressForm";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { BookingSidebar } from "@/components/booking/BookingSidebar";
import { cleaners } from "@/data/cleaners";
import { useAuth } from "@/hooks/useAuth";

const PENDING_KEY = "n9awa_pending_booking";

interface BookingState {
  service: string;
  date: string;
  time: string;
  address: AddressData;
}

interface ValidationErrors {
  service?: string;
  date?: string;
  time?: string;
  address?: Partial<Record<keyof AddressData, string>>;
}

const DEFAULT_ADDRESS: AddressData = {
  city: "",
  quartier: "",
  adresse: "",
  etage: "",
  instructions: "",
};

const stepVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const cleaner = cleaners.find((c) => c.id === Number(params.id)) ?? cleaners[0];
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    service: "",
    date: "",
    time: "",
    address: { ...DEFAULT_ADDRESS },
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Restore pending booking after auth redirect
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const raw = sessionStorage.getItem(PENDING_KEY);
      if (!raw) return;
      const pending = JSON.parse(raw) as {
        cleanerId: number;
        booking: BookingState;
        targetStep: number;
      };
      if (pending.cleanerId === Number(params.id)) {
        setBooking(pending.booking);
        setStep(pending.targetStep ?? 5);
        sessionStorage.removeItem(PENDING_KEY);
      }
    } catch {
      // ignore malformed data
    }
  }, [isAuthenticated, params.id]);

  function validate(): boolean {
    const next: ValidationErrors = {};

    if (step === 1 && !booking.service) {
      next.service = "Veuillez sélectionner un service.";
    }
    if (step === 2) {
      if (!booking.date) next.date = "Veuillez choisir une date.";
      if (!booking.time) next.time = "Veuillez choisir un créneau horaire.";
    }
    if (step === 3) {
      const a: Partial<Record<keyof AddressData, string>> = {};
      if (!booking.address.city) a.city = "Choisissez une ville.";
      if (!booking.address.quartier) a.quartier = "Indiquez votre quartier.";
      if (!booking.address.adresse) a.adresse = "Indiquez l'adresse complète.";
      if (Object.keys(a).length) next.address = a;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (!validate()) return;

    if (step === 4) {
      if (!isAuthenticated) {
        sessionStorage.setItem(
          PENDING_KEY,
          JSON.stringify({ cleanerId: cleaner.id, booking, targetStep: 5 })
        );
        navigate(
          `/login?redirect=${encodeURIComponent(`/booking/${cleaner.id}`)}`
        );
        return;
      }
      setStep(5);
      return;
    }

    setStep((s) => Math.min(s + 1, 5));
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  const showSidebar = step < 5;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA]">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BookingStepper step={step} />

          <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    {step === 1 && (
                      <ServiceSelection
                        value={booking.service}
                        onChange={(v) => {
                          setBooking((b) => ({ ...b, service: v }));
                          setErrors((e) => ({ ...e, service: undefined }));
                        }}
                        error={errors.service}
                      />
                    )}
                    {step === 2 && (
                      <DateTimeSelection
                        date={booking.date}
                        time={booking.time}
                        onDateChange={(v) => {
                          setBooking((b) => ({ ...b, date: v }));
                          setErrors((e) => ({ ...e, date: undefined }));
                        }}
                        onTimeChange={(v) => {
                          setBooking((b) => ({ ...b, time: v }));
                          setErrors((e) => ({ ...e, time: undefined }));
                        }}
                        errors={{ date: errors.date, time: errors.time }}
                      />
                    )}
                    {step === 3 && (
                      <AddressForm
                        value={booking.address}
                        onChange={(v) => {
                          setBooking((b) => ({ ...b, address: v }));
                          setErrors((e) => ({ ...e, address: undefined }));
                        }}
                        errors={errors.address}
                      />
                    )}
                    {step === 4 && (
                      <BookingSummary
                        cleaner={cleaner}
                        service={booking.service}
                        date={booking.date}
                        time={booking.time}
                        address={booking.address}
                      />
                    )}
                    {step === 5 && (
                      <BookingConfirmation
                        cleaner={cleaner}
                        service={booking.service}
                        date={booking.date}
                        time={booking.time}
                        address={booking.address}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              {step < 5 && (
                <div className="mt-4 space-y-3">
                  {/* Auth warning on step 4 for guests */}
                  <AnimatePresence>
                    {step === 4 && !isAuthenticated && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700"
                      >
                        <Lock size={14} className="flex-shrink-0" />
                        Veuillez vous connecter pour confirmer votre réservation.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={`flex gap-3 ${step === 1 ? "justify-end" : "justify-between"}`}
                  >
                    {step > 1 && (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={back}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E5E7EB] bg-white text-gray-600 text-sm font-semibold hover:bg-[#F9FAFB] transition-colors"
                      >
                        <ChevronLeft size={16} />
                        Retour
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ y: -1, boxShadow: "0 8px 20px rgba(38,120,209,0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={next}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2678D1] hover:bg-[#1F85C4] text-white text-sm font-bold transition-colors shadow-sm"
                    >
                      {step === 4 ? (
                        <>
                          {!isAuthenticated ? (
                            <>
                              <Lock size={15} />
                              Se connecter pour confirmer
                            </>
                          ) : (
                            <>
                              <CalendarCheck size={15} />
                              Confirmer la réservation
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          Continuer
                          <ChevronRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            {showSidebar && (
              <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
                <BookingSidebar
                  cleaner={cleaner}
                  service={booking.service}
                  date={booking.date}
                  time={booking.time}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
