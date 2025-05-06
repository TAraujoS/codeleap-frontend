import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "danger" | "success" | "cancel";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  const base =
    "h-8 px-6 rounded-lg font-bold transition disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300",
    danger: "text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-300",
    success: "text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300",
    cancel: "bg-white text-black border border-black hover:bg-gray-100",
  };

  return (
    <button
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
