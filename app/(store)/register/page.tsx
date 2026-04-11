"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  KeyRound,
  Mail,
  MapPin,
  Camera,
  Loader2,
  Phone,
} from "lucide-react";
import { useRegister } from "@/lib/hooks/useAuth";
import { RegisterInput } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/store/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 🛡️ EXPERT GUARD: Redirect logged-in users away from registration
  useEffect(() => {
    setIsMounted(true);
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  // CLEANUP: Revoke the object URL when the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { mutate: register, isPending } = useRegister();
  
  // Prevent Hydration Flash
  if (!isMounted) return null;

  const [formData, setFormData] = useState<RegisterInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    avatar: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      const file = files[0];

      // CLEANUP: Revoke the PREVIOUS object URL before creating a new one
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const objectUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: file }));
      setImagePreview(objectUrl);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register(formData);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-[950px] w-full bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 lg:p-14 border border-gray-100 flex flex-col relative overflow-hidden">
        {/* Header Setup */}
        <div className="flex items-center justify-center gap-3 mb-8 relative z-10">
          <div className="w-16 h-16 bg-primary rounded-[16px] flex items-center justify-center text-white shadow-sm shrink-0">
            <div className="relative">
              <User size={26} strokeWidth={2} />
              <KeyRound
                size={14}
                strokeWidth={3}
                className="absolute -bottom-1 -right-2 bg-primary rounded-full"
              />
            </div>
          </div>
          <div className="text-start">
            <h2 className="text-[28px] font-bold text-[#2D333A] tracking-tight mb-1">
              Create New Account
            </h2>
            <p className="text-gray-500 text-[15px]">Register to get started</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative z-10">
          {/* Left Column (Maintains Original Design) */}
          <div className="flex-1 bg-[#F9FAFB] rounded-[14px] p-6 lg:p-8 lg:pr-14 flex flex-col">
            <h3 className="font-semibold text-[#2D333A] text-[15px] mb-6">
              Signup With Mobile Number
            </h3>
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Smartphone size={18} className="text-primary" />
              </div>
              <input
                type="text"
                placeholder="01*********"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] tracking-wide"
              />
            </div>
            <div className="mt-auto pt-6 lg:pt-0">
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-[8px] transition-colors shadow-sm text-[15px]">
                Send OTP
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center relative w-16 -mx-8 z-20">
            <div className="absolute top-8 bottom-8 w-px bg-gray-200"></div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[11px] font-bold text-gray-400 z-10 border border-gray-100 shadow-sm relative tracking-wider">
              OR
            </div>
          </div>

          {/* Right Column (Functional with Original Design) */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-[#F9FAFB] rounded-[14px] p-6 lg:p-8 lg:pl-14"
          >
            <h3 className="font-semibold text-[#2D333A] text-[15px] mb-6">
              Register a new account
            </h3>

            <div className="space-y-4 mb-7">
              {/* Avatar Upload (Added to meet backend req) */}
              <div className="flex items-center gap-4 mb-2 bg-white p-3 rounded-[8px] border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={20} className="text-gray-300" />
                  )}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-[13px] text-gray-500 font-medium">
                  Upload Profile Picture
                </p>
              </div>

              {/* Name Fields (Split to match backend) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-primary" />
                  </div>
                  <input
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="First Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
                  />
                </div>
                <div className="relative">
                  <input
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last Name"
                    className="w-full pl-4 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-primary" />
                </div>
                <input
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 transition-all text-[15px]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-primary" />
                </div>
                <input
                  name="phoneNumber"
                  required
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 transition-all text-[15px]"
                />
              </div>

              {/* Passwords */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-primary" />
                </div>
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none transition-all text-[15px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-primary" />
                </div>
                <input
                  name="confirmPassword"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none transition-all text-[15px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-primary" />
                </div>
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Address"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none transition-all text-[15px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-[8px] transition-all shadow-sm text-[15px] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Register account"
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 pt-8 flex flex-col items-center relative z-10">
          <div className="relative w-full max-w-[280px] mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="px-4 bg-white text-gray-500 font-medium">
                or signup with
              </span>
            </div>
          </div>
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors mb-10 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="22px"
              height="22px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </button>
          <div className="text-[14.5px] text-gray-500 font-medium">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
