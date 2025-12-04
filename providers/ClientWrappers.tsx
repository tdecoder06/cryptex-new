"use client";

import PrivyProviders from "@/providers/PrivyProviders";

export default function ClientWrappers({ children }: { children: React.ReactNode }) {
  return <PrivyProviders>{children}</PrivyProviders>;
}
