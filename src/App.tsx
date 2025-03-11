import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import Tabs from "@/components/common/Tabs";

function App() {
  return (
    <MainLayout>
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab index={0}>탭 1</Tabs.Tab>
          <Tabs.Tab index={1}>탭 2</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel index={0}>탭 1</Tabs.TabPanel>
          <Tabs.TabPanel index={1}>탭 2</Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </MainLayout>
  );
}

export default App;
