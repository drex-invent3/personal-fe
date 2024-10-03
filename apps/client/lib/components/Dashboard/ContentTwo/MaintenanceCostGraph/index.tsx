import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import Y2DTab from './Y2DTab';
import MTMTab from './MTMTab';

const MaintenanceCostGraph = () => {
  return (
    <VStack
      width="full"
      height="full"
      minH="354px"
      p="16px 19px 19px 16px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Total Maintenance Cost</CardHeader>
      <Tabs variant="custom" width={'full'}>
        <TabList>
          <Tab paddingBottom="4px">YTD</Tab>
          <Tab paddingBottom="4px">MTM</Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt="16px">
            <Y2DTab />
          </TabPanel>
          <TabPanel mt="16px">
            <MTMTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default MaintenanceCostGraph;
