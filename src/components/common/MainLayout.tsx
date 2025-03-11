import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center w-full min-h-full overflow-scroll bg-bg py-60">
      <main className="max-w-[655px] w-full relative">{children}</main>
    </div>
  );
}
