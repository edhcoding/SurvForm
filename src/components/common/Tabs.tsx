import { createContext, PropsWithChildren, useContext, useState } from "react";
import cn from "classnames";

function Tabs({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col">{children}</div>
    </TabContext.Provider>
  );
}

const TabContext = createContext<{
  activeTab: number;
  setActiveTab: (_: number) => void;
}>({
  activeTab: 0,
  setActiveTab: (_: number) => {},
});

Tabs.TabList = function TabList({ children }: PropsWithChildren) {
  return <div className="flex justify-center gap-x-20">{children}</div>;
};

Tabs.Tab = function Tab({
  children,
  index,
}: PropsWithChildren<{ index: number }>) {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <button
      className={cn("border-b-3 p-14", {
        "text-main border-main": activeTab === index,
        "border-translate text-gray500": activeTab !== index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

Tabs.TabPanels = function TabPanels({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>;
};

Tabs.TabPanel = function TabPanel({
  children,
  index,
}: PropsWithChildren<{ index: number }>) {
  const { activeTab } = useContext(TabContext);

  return <div hidden={index !== activeTab}>{children}</div>;
};

export default Tabs;
