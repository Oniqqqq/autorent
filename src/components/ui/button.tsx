import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        {
          "bg-gradient-to-b from-orange-500 to-orange-600 text-white hover:from-orange-400 hover:to-orange-500 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 border border-orange-600/50": variant === "default",
          "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 shadow-sm": variant === "outline",
          "hover:bg-gray-100 text-gray-700": variant === "ghost",
          "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
          "h-12 px-6 py-2": size === "default",
          "h-9 rounded-lg px-3": size === "sm",
          "h-14 rounded-2xl px-8 text-base": size === "lg",
          "h-12 w-12": size === "icon",
        },
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
