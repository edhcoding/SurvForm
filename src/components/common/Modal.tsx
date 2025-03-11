import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
  opend: boolean;
}

export default function Modal({ children, opend }: PropsWithChildren<Props>) {
  return opend
    ? createPortal(
        <div className="fixed inset-0 flex items-center justify-center size-full bg-black/30">
          <div className="z-10 bg-white rounded-10 max-w-[655px] w-full">
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
