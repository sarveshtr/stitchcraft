import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMemo } from "react";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const principal = useMemo(() => {
    if (!identity) return null;
    return identity.getPrincipal().toText();
  }, [identity]);

  const isAuthenticated =
    (loginStatus === "success" || loginStatus === "idle") && !!identity;
  const isLoading = loginStatus === "initializing";

  // Simple admin check — in production, this would be verified server-side
  const ADMIN_PRINCIPALS = (import.meta.env.VITE_ADMIN_PRINCIPALS ?? "")
    .split(",")
    .filter(Boolean);

  const isAdmin =
    isAuthenticated && !!principal && ADMIN_PRINCIPALS.includes(principal);

  return {
    isAuthenticated,
    isLoading,
    principal,
    identity,
    isAdmin,
    login,
    logout: clear,
    loginStatus,
  };
}
