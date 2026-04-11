import { useMutation } from "@tanstack/react-query";
import { authService, RegisterInput } from "../services/auth-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (response, variables) => {
      toast.success("Account Created!", {
        description: response.message || "Please check your email for the verification code.",
      });

      if (response.data.requiresVerification) {
        router.push(`/verify-email?email=${variables.email}`);
      } else {
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Registration failed";
      toast.error("Registration Failed", {
        description: message,
      });
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authService.verifyEmail(email, code),
    onSuccess: (response) => {
      const { user, token } = response.data;
      
      // EXPERT MOVE: Auto-login after verification
      setCredentials(user, token);
      
      toast.success("Email Verified!", {
        description: `Welcome ${user.firstName}! Your account is now active.`,
      });
      
      // Redirect to home/dashboard
      router.push("/");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Verification failed";
      toast.error("Verification Error", {
        description: message,
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: ({ email, password }: any) => authService.login(email, password),
    onSuccess: (response) => {
      const { user, token } = response.data;
      
      setCredentials(user, token);
      
      toast.success("Welcome Back!", {
        description: `Successfully signed in as ${user.displayName}.`,
      });
      
      router.push("/");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Login failed";
      toast.error("Login Failed", {
        description: message,
      });
    },
  });
};
