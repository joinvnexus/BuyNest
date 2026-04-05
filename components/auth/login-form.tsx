"use client";

import Link from "next/link";
import type { Route } from "next";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get("callbackUrl") || "/products";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: redirectTo,
    });

    setLoading(false);

    if (result?.ok) {
      router.push((result.url || redirectTo) as Route);
      return;
    }

    toast.error("Invalid email or password");
  };

  return (
    <AuthShell
      eyebrow="Account access"
      title="Sign in to continue shopping."
      description="Access checkout, keep your cart attached to your account, and manage orders from a single session."
      footerText="Don't have an account?"
      footerLinkHref="/register"
      footerLinkLabel="Create one"
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to {redirectTo === "/products" ? "the catalog" : "your next step"}.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-2xl"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href={"/register" as Route}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Need an account?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-2xl"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-custom-accent hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
