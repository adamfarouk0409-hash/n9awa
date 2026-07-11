import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";
import SearchResults from "@/pages/SearchResults";
import CleanerProfile from "@/pages/CleanerProfile";
import BookingPage from "@/pages/BookingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import CustomerDashboard from "@/pages/CustomerDashboard";
import Reservations from "@/pages/Reservations";
import ReservationDetails from "@/pages/ReservationDetails";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Contact from "@/pages/Contact";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { FeaturedCleaners } from "@/components/FeaturedCleaners";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PremiumSection } from "@/components/PremiumSection";
import { Testimonials } from "@/components/Testimonials";
import { Statistics } from "@/components/Statistics";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";

const queryClient = new QueryClient();

function Home() {
  return (
    <AppLayout>
      <Hero />
      <Services />
      <FeaturedCleaners />
      <HowItWorks />
      <WhyChooseUs />
      <PremiumSection />
      <Testimonials />
      <Statistics />
      <Blog />
      <FAQ />
      <CTASection />
    </AppLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/reservations" component={Reservations} />
      <Route path="/reservations/:id" component={ReservationDetails} />
      <Route path="/profil" component={Profile} />
      <Route path="/parametres" component={Settings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/cleaner/:id" component={CleanerProfile} />
      <Route path="/booking/:id" component={BookingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/dashboard" component={CustomerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/search" component={SearchResults} />
              <Route path="/reservations" component={() => (
                <ProtectedRoute><Reservations /></ProtectedRoute>
              )} />
              <Route path="/reservations/:id" component={ReservationDetails} />
              <Route path="/profil" component={() => (
                <ProtectedRoute><Profile /></ProtectedRoute>
              )} />
              <Route path="/parametres" component={() => (
                <ProtectedRoute><Settings /></ProtectedRoute>
              )} />
              <Route path="/notifications" component={() => (
                <ProtectedRoute><Notifications /></ProtectedRoute>
              )} />
              <Route path="/cleaner/:id" component={CleanerProfile} />
              <Route path="/booking/:id" component={BookingPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/contact" component={Contact} />
              <Route path="/dashboard" component={() => (
                <ProtectedRoute><CustomerDashboard /></ProtectedRoute>
              )} />
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
