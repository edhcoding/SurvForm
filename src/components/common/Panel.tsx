import { PropsWithChildren } from "react";
import cn from "classnames";

function Panel({ className, children }: PropsWithChildren<Cn>) {
  return (
    <div
      className={cn(
        "flex flex-col pl-20 pr-20 pb-20 bg-white rounded-10 pt-26",
        className
      )}
    >
      {children}
    </div>
  );
}

Panel.Header = function PanelHeader({
  className,
  children,
}: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>;
};

Panel.Body = function PanelBody({
  className,
  children,
}: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>;
};

Panel.Footer = function PanelFooter({
  className,
  children,
}: PropsWithChildren<Cn>) {
  return (
    <>
      {/* hr 태그는 수평선을 만드는 태그 */}
      <hr className="border-gray100" />
      <div className={className}>{children}</div>
    </>
  );
};

export default Panel;

export function PanelCap({ children }: PropsWithChildren) {
  return (
    <div className="relative -mb-10">
      {children && (
        <div className="inline-block pt-10 pb-6 text-white px-14 bg-main rounded-t-10 text-15">
          {children}
        </div>
      )}
      <div className="bg-main h-9" />
    </div>
  );
}
