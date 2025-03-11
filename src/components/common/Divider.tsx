import cn from "classnames";

interface Props {
  direction?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({
  className,
  direction = "horizontal",
}: Cn<Props>) {
  if (direction === "horizontal") {
    return <hr className={cn("w-full border-gray100 border-t", className)} />;
  }

  return <hr className={cn("h-full border-gray100 border-l", className)} />;
}
