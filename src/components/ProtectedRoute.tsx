import { ReactNode, useLayoutEffect } from "react";

import { useNavigate } from "react-router-dom";

import { User, useUserStore } from "@/hooks/useUserStore";
import { useModalStore } from "@/store/useModalStore";

interface ProtectedRouteConditionType {
  isPass: boolean;
  redirectPath: string;
  message: string;
}

interface ProtectedRouteParamType {
  user: User | null;
  isLoggedIn: boolean;
}

interface ProtectedRouteProps {
  children: ReactNode;
  conditions: (
    params: ProtectedRouteParamType,
  ) => ProtectedRouteConditionType[];
}

function ProtectedRoute({ children, conditions }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const openModal = useModalStore((state) => state.openModal);

  useLayoutEffect(() => {
    if (user === undefined) return;
    const receivedConditions = conditions({ user, isLoggedIn });

    for (const { isPass, redirectPath, message } of receivedConditions) {
      if (!isPass) {
        if (message) {
          openModal({
            type: "alert",
            iconType: "warning",
            message,
            onClose: () => navigate(redirectPath),
          });
        } else {
          navigate(redirectPath);
        }
        break;
      }
    }
  }, [user, isLoggedIn, conditions, openModal, navigate]);

  if (user === undefined) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
