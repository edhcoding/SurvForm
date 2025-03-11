import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@/components/common/Tabs";

function App() {
  return (
    <MainLayout>
      <Tabs>
        <TabList>
          <Tab index={0}>탭 1</Tab>
          <Tab index={2}>탭 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={0}>탭 1</TabPanel>
          <TabPanel index={1}>탭 2</TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
}

export default App;
