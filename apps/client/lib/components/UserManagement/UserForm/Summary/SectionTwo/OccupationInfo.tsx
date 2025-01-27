import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const OccupationInfo = () => {
  const { employmentType, branch, jobTitle, team, userRole, userGroup } =
    useAppSelector((state) => state.user.userForm);

  const infoOne = [
    {
      label: 'Employment Type',
      value: employmentType,
    },
    {
      label: 'Branch',
      value: branch,
    },
    {
      label: 'Job Title',
      value: jobTitle,
    },
    {
      label: 'Team',
      value: team,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">Occupation Info</DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={2}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SimpleGrid width="full" gap="20px" columns={2}>
          <SummaryInfo label="User Role" value={userRole} />

          <VStack width="full" spacing="4px" alignItems="flex-start">
            <Text color="neutral.600">User Group</Text>
            <HStack wrap="wrap" spacing="8px">
              {userGroup.length > 0 ? (
                userGroup.map((item, index) => (
                  <Text
                    key={index}
                    size="md"
                    color="black"
                    bgColor="#E6E6E6"
                    py="8px"
                    px="12px"
                    rounded="16px"
                  >
                    {item}
                  </Text>
                ))
              ) : (
                <Text size="md">N/A</Text>
              )}
            </HStack>
          </VStack>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default OccupationInfo;
