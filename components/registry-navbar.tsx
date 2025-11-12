"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AppRouteItem } from "@/lib/routes";

interface RegistryNavbarProps {
  options: AppRouteItem[];
  className?: string;
}

export default function RegistryNavbar(props: RegistryNavbarProps) {
  const { className, options } = props;
  const pathname = usePathname();

  const iconSrc = "/3d-logo.png";

  return (
    <nav
      className={cn("flex items-center px-6 py-4 bg-accent w-full", className)}
    >
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
      <img src={iconSrc} alt="3D Registry" width={40} height={40} className="object-contain" />
        <h2>3D Registry</h2>
      </Link>
      <div className="flex items-center gap-3 ml-10">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="link"
            className={cn(
              "hover:underline w-fit p-0 underline-none text-muted-foreground hover:text-foreground hover:scale-95 transition-all duration-300",
              pathname === option.href && "text-foreground font-bold hover:text-foreground"
            )}
          >
            <Link href={option.href}>{option.title}</Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
