"use server";

import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";

export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.password) {
    return { error: "Cannot change password for this account type" };
  }

  const { compare } = await import("bcryptjs");
  const isValid = await compare(currentPassword, user.password);

  if (!isValid) {
    return { error: "Current password is incorrect" };
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const hashedPassword = await hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });

  revalidatePath("/account");
  return { success: true };
}

export async function deleteAccount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  await prisma.user.delete({
    where: { id: session.user.id },
  });

  await signOut({ callbackUrl: "/" });
  return { success: true };
}

export async function updateProfile(data: { name?: string; email?: string }) {
  const { name, email } = data;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  if (!email?.trim()) {
    return { error: "Email is required" };
  }

  const normalized = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(normalized)) {
    return { error: "Please provide a valid email address" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name?.trim() || null,
      email: normalized,
    },
  });

  revalidatePath("/account");
  return { success: true };
}
