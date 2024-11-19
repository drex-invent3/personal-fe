'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Schedules from './Schedules';
import History from './History';
import Filters from './Schedules/Filters';
import ScheduleFilterDisplay from './Schedules/Filters/ScheduleFilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import Plans from './Plans';
import Header from './Header';

const ALlTabs = ['Plans', 'Schedules', 'History'];

const Maintenance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'schedule' | 'plan' | 'history' | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterData, setFilterData] = useState<FilterInput>({
    region: [],
    status: [],
    category: [],
  });

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = ALlTabs.findIndex((value) => value === tab);
      if (tabIndex !== -1) {
        setTabIndex(tabIndex);
      }
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/maintenance?tab=${tabName}`);
    }
  };

  // Handles Toggling the  Filter
  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);

  const headerInfo = {
    1: {
      name: 'Schedules',
      href: '/maintenance/schedules/add',
    },
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header {...headerInfo[tabIndex as 1]} />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs
          variant="custom"
          width={'full'}
          onChange={(index) => handleTabChange(index)}
          index={tabIndex}
        >
          <Flex width="full" position="relative">
            <TabList>
              <Tab>Plans</Tab>
              <Tab>Schedules</Tab>
              <Tab>History</Tab>
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <Filters
                setSearch={setSearch}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>{tabIndex === 0 && <Plans />}</TabPanel>
            <TabPanel>
              <ScheduleFilterDisplay
                isOpen={isOpen}
                filterData={filterData}
                setFilterData={setFilterData}
              />
              {tabIndex === 1 && <Schedules />}
            </TabPanel>
            <TabPanel>
              <History />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Maintenance;
