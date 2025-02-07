import { Flex } from '@chakra-ui/react';

import AssetsInRegion from './AssetsInRegion';
import UpcomingMaintenance from '../../Common/UpcomingMaintenance';

const SectionThree = () => {
  return (
    <Flex
      width="full"
      gap="16px"
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <Flex width={{ base: 'full', lg: '48%' }}>
        <AssetsInRegion />
      </Flex>
      <Flex width={{ base: 'full', lg: '52%' }}>
        <UpcomingMaintenance />
      </Flex>
    </Flex>
  );
};

export default SectionThree;
