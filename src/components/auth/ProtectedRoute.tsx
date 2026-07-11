import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(location)}`);
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  if (isLoading || !isAuthenticated) return null;
  return <>{children}</>;
}
