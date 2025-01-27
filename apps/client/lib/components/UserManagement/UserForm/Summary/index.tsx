import { FormActionButtons } from '@repo/ui/components';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Flex, VStack } from '@chakra-ui/react';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep } = props;
  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === 4 ? 'flex' : 'none'}
      >
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="40px"
          bgColor="white"
          pt="16px"
          pl="16px"
          pr="44px"
          pb="40px"
          rounded="8px"
          minH="60vh"
        >
          <SectionOne />
          <SectionTwo />
        </VStack>
        <FormActionButtons
          cancelLink={`/${ROUTES.USERS}`}
          totalStep={4}
          activeStep={4}
          setActiveStep={setActiveStep}
        />
      </Flex>
    </>
  );
};

export default SummaryStep;
