import { useParams, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AboutSection } from "@/components/profile/AboutSection";
import { ServicesSection } from "@/components/profile/ServicesSection";
import { AvailabilitySection } from "@/components/profile/AvailabilitySection";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { LanguagesSection } from "@/components/profile/LanguagesSection";
import { GallerySection } from "@/components/profile/GallerySection";
import { ReviewsSection } from "@/components/profile/ReviewsSection";
import { BookingCard } from "@/components/profile/BookingCard";
import { SimilarProfessionals } from "@/components/profile/SimilarProfessionals";
import { cleaners } from "@/data/searchData";

export default function CleanerProfile() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const cleaner = cleaners.find((c) => c.id === Number(params.id)) ?? cleaners[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA]">
      <Navbar />

      <ProfileHeader cleaner={cleaner} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/search?mode=customer")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2678D1] transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Retour aux résultats
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 space-y-5">
            <AboutSection cleaner={cleaner} />
            <ServicesSection cleaner={cleaner} />
            <AvailabilitySection cleaner={cleaner} />
            <ExperienceSection cleaner={cleaner} />
            <LanguagesSection />
            <GallerySection />
            <ReviewsSection cleaner={cleaner} />

            <div className="lg:hidden">
              <BookingCard cleaner={cleaner} sticky={false} />
            </div>
          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <BookingCard cleaner={cleaner} sticky={true} />
          </div>
        </div>

        <SimilarProfessionals currentId={cleaner.id} />
      </main>

      <Footer />
    </div>
  );
}
