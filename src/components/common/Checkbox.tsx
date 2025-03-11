import { forwardRef, InputHTMLAttributes } from "react";
import CheckIcon from "@/assets/icons/check_box.svg?react";
import UnCheckedIcon from "@/assets/icons/check_box_outline_blank.svg?react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { label, ...props },
  ref
) {
  return (
    <label className="relative flex items-center h-26">
      <input
        ref={ref}
        type="checkbox"
        className="opacity-0 peer size-26"
        {...props}
      />
      <CheckIcon className="absolute top-0 left-0 transition-opacity opacity-0 peer-checked:opacity-100" />
      <UnCheckedIcon className="absolute top-0 left-0 transition-opacity opacity-100 peer-checked:opacity-0" />
      <span className="pl-14">{label}</span>
    </label>
  );
});

export default Checkbox;
