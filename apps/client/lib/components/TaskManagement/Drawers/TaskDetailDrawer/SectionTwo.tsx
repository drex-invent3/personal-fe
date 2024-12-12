import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { amountFormatter } from '~/lib/utils/Formatters';

interface SectionTwoProps {
  data: TaskInstance;
}
const SectionTwo = ({ data }: SectionTwoProps) => {
  return (
    <VStack width="full" spacing="34px" pl="32px" pr="28px">
      <HStack width="full" spacing="57px" alignItems="flex-start">
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Schedule ID
          </Text>
          <Text color="neutral.600" size="md">
            <Text as="span" color="black">
              {data?.scheduleInstanceId}
            </Text>{' '}
            - {data?.taskInstanceId}
          </Text>
        </VStack>
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Estimate Cost
          </Text>
          <Text color="black" size="md">
            {amountFormatter(data?.costEstimate ?? 0)}
          </Text>
        </VStack>
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Assign to:
          </Text>
          <HStack spacing="14px">
            <Avatar
              width="42px"
              height="42px"
              name={data?.assignedToEmployeeName}
            />
            <Text size="md" color="black">
              {data?.assignedToEmployeeName ?? 'N/A'}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <Text color="neutral.600" fontWeight={700}>
          Description:
        </Text>
        <Text
          bgColor="#F0F0F0"
          color="neutral.700"
          size={!data?.taskDescription ? 'base' : 'md'}
          rounded="8px"
          px="11px"
          pb="38px"
          pt={!data?.taskDescription ? '38px' : '8px'}
          width="full"
          textAlign={data?.taskDescription ? 'left' : 'center'}
        >
          {data?.taskDescription ?? 'No Description'}
        </Text>
      </VStack>
    </VStack>
  );
};

export default SectionTwo;
