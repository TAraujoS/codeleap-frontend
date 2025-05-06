import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { username } = useUser();

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
}
