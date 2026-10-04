import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  block?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-signal text-white hover:bg-signal-press active:bg-signal-press disabled:bg-graphite disabled:text-ash",
  secondary: "bg-graphite text-chalk hover:bg-[#35353c] active:bg-[#35353c]",
  quiet: "text-ash hover:bg-graphite hover:text-chalk",
};

export default function Button({
  variant = "primary",
  block = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed ${
        block ? "w-full" : ""
      } ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
