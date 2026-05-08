"use client";
import { type HTMLAttributes, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neon-cyan text-black hover:bg-neon-cyan/90",
        ghost: "hover:bg-white/10 hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export function Banner({
  id,
  variant = "normal",
  height = "3.5rem",
  rainbowColors = [
    "#00F2FF",
    "#B026FF",
    "#39FF14",
    "#FF00E5",
  ],
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  height?: string;
  variant?: "rainbow" | "normal";
  rainbowColors?: string[];
}) {
  const [open, setOpen] = useState(true);
  const globalKey = id ? `progamerx-banner-${id}` : null;

  useEffect(() => {
    if (globalKey) setOpen(localStorage.getItem(globalKey) !== "true");
  }, [globalKey]);

  if (!open) return null;

  return (
    <div
      id={id}
      {...props}
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-row items-center justify-center px-4 text-center text-sm font-bold uppercase tracking-widest",
        variant === "normal" && "bg-neutral-900 text-white border-b border-white/10",
        variant === "rainbow" && "bg-background text-white overflow-hidden",
        props.className,
      )}
      style={{ height }}
    >
      {variant === "rainbow" && flow({ colors: rainbowColors })}
      <div className="relative z-10 flex items-center gap-2">
        {props.children}
      </div>
      {id && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen(false);
            if (globalKey) localStorage.setItem(globalKey, "true");
          }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}

function flow({ colors }: { colors: string[] }) {
  const maskImage = "linear-gradient(to bottom, white, transparent), radial-gradient(circle at top center, white, transparent)";
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage,
          maskComposite: "intersect",
          animation: "moving-banner 10s linear infinite",
          backgroundImage: `repeating-linear-gradient(70deg, ${[...colors, colors[0]].map((color, i) => `${color} ${(i * 100) / colors.length}%`).join(", ")})`,
          backgroundSize: "200% 100%",
          opacity: 0.3,
        }}
      />
      <style>{`
        @keyframes moving-banner {
          from { background-position: 0% 0; }
          to { background-position: 100% 0; }
        }
      `}</style>
    </>
  );
}
