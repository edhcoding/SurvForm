import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        "px-28 py-14 text-16 font-medium rounded-10 border",
        classes[variant],
        className
      )}
      {...props}
    ></button>
  );
}

const classes: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-main border-main text-white",
  secondary: "border-main bg-white text-main",
  tertiary: "text-gray700 border-0 bg-transparent",
};
