import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import { useWatch } from "react-hook-form";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "border-b-1 border-b-gray200 pb-16 outline-none resize-none",
        "focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-6",
        className
      )}
      {...props}
    />
  );
});

export default Textarea;

export function AutoGrow({
  value,
  forTextarea = "",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value?: string; forTextarea?: string }) {
  const valueFromWatch = useWatch({ name: forTextarea });

  return (
    <div
      className={cn(
        "grid",
        "after:content-[attr(data-replicated-value)] after:whitespace-pre-wrap after:invisible after:pb-16 after:auto-grow", // attr - 요소의 속성을 문자열로 변환하여 브라우저에 보여준다. (https://velog.io/@dev-tinkerbell/CSS-Content-%EC%86%8D%EC%84%B1)
        "[&>textarea]:auto-grow",
        className
      )}
      data-replicated-value={value ?? valueFromWatch}
      {...props}
    />
  );
}
