import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useGetFrontdeskChartDataQuery } from '~/lib/redux/services/dashboard/frontdesk.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import MaintenanceSuccessChart from '../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import TicketTrend from './TicketTrend';

const SectionTwo = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetFrontdeskChartDataQuery({
    userId: user?.userId!,
    year: +selectedYear?.value!,
  });
  return (
    <Grid templateColumns="repeat(3, 1fr)" width="full" gap="16px">
      <GridItem colSpan={2}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          width="full"
          bgColor="white"
          rounded="8px"
        >
          <TicketTrend
            data={data?.data?.openedAndResolvedTickets ?? []}
            isLoading={isLoading || isFetching}
          />
          <TaskCompletionRateChart
            notCompletedColorCode="#00A129"
            completedColorCode="#033376"
            data={data?.data?.completeAndIncompleteTasks ?? []}
            isLoading={isLoading || isFetching}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={1}>
        <MaintenanceSuccessChart
          missedColorCode="#00A129"
          completedColorCode="#033376"
        />
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
