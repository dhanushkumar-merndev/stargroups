/* eslint-disable @next/next/no-img-element -- logos are user-uploaded and swap
   at runtime via onError, which next/image's static analysis can't express */
"use client";

import { useState } from "react";
import { GROUP_LOGO, type Company } from "@/lib/companies";
import { cn } from "@/lib/utils";

/**
 * Renders a company's own logo, falling back to the shared Star Groups mark
 * if that file is missing or fails to load — several companies haven't
 * uploaded distinct artwork yet, so this keeps every badge populated instead
 * of showing a broken image.
 */
export function CompanyLogo({
  company,
  className,
}: {
  company: Pick<Company, "name" | "logo">;
  className?: string;
}) {
  const [src, setSrc] = useState(company.logo);

  return (
    <img
      src={src}
      alt={`${company.name} logo`}
      className={cn("object-contain", className)}
      onError={() => {
        if (src !== GROUP_LOGO) setSrc(GROUP_LOGO);
      }}
    />
  );
}
