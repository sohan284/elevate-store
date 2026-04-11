import { useMutation } from "@tanstack/react-query";
import { authService, RegisterInput } from "../services/auth-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (response, variables) => {
      toast.success("Account Created!", {
        description:
          response.message ||
          "Please check your email for the verification code.",
      });

      if (response.data.requiresVerification) {
        router.push(`/verify-email?email=${variables.email}`);
      } else {
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error("Registration Failed", {
        description: message,
      });
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authService.verifyEmail(email, code),
    onSuccess: (response) => {
      toast.success("Email Verified!", {
        description: "You can now log in to your account.",
      });
      router.push("/signin");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Verification failed";
      toast.error("Verification Error", {
        description: message,
      });
    },
  });
};
