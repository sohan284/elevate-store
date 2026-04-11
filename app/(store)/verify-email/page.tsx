"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useVerifyEmail } from "@/lib/hooks/useAuth";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState("");

  const { mutate: verify, isPending } = useVerifyEmail();

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) return;
    verify({ email, code });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-gray-100 flex flex-col relative overflow-hidden text-center">
        <div className="w-20 h-20 bg-emerald-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <ShieldCheck size={40} strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-500 text-[15px] mb-8">
          We've sent a 6-digit verification code to{" "}
          <span className="text-gray-900 font-bold">{email}</span>. Please enter
          it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-primary" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 transition-all text-[15px]"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheck size={18} className="text-primary" />
              </div>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-Digit Code"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 transition-all text-[15px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-[8px] transition-colors shadow-sm text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              <>
                Verify Account <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50">
          <p className="text-sm text-gray-400">
            Didn't receive a code?{" "}
            <button className="text-primary/90 font-bold hover:underline">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
