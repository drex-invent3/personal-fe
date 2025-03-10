import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import DropDown from '../../Common/DropDown';
import CardHeader from '../../Common/CardHeader';
import LineChart from '../../Common/Charts/LineChart';
import { useGetSuperAdminTrafficCountGraphQuery } from '~/lib/redux/services/dashboard/superadmin.services';
import { transformMonthIdsToShortNames } from '../../Common/utils';

const rangeOptions = [
  {
    label: 'Daily',
    value: 1,
  },
  {
    label: 'Weekly',
    value: 2,
  },
];
const TrafficAnalytics = () => {
  const { data, isLoading } = useGetSuperAdminTrafficCountGraphQuery();
  const [selectedRange, setSelectedRange] = useState<Option | undefined>(
    rangeOptions[0] as Option
  );

  return (
    <VStack
      height="full"
      p="20px"
      alignItems="flex-start"
      justifyContent="space-between"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Traffic Analytics</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => {
            setSelectedRange && setSelectedRange(option);
          }}
          selectedOptions={selectedRange ?? null}
          width="100px"
        />
      </HStack>
      <LineChart
        labels={
          data?.data
            ? transformMonthIdsToShortNames(
                data?.data.map((item) => item.monthId)
              )
            : []
        }
        datasets={[
          {
            label: 'Opened',
            data: data?.data?.map((item) => item.trafficCount) ?? [],
            borderColor: '#0366EF',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#0366EF',
            pointRadius: 0,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          },
        ]}
        isLoading={isLoading}
        showXGrid={false}
        showYGrid
      />
    </VStack>
  );
};

export default TrafficAnalytics;
