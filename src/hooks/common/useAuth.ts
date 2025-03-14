import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  const { user } = useContext(AuthContext);

  return user;
}
