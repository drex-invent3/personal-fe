import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { planScheduleSchema } from '~/lib/schemas/maintenance.schema';
import { useAppSelector } from '~/lib/redux/hooks';
// import ScheduleList from './ScheduleList';
import ScheduleForm from './ScheduleForm';
import SlideTransition from '~/lib/components/UI/SlideTransition';
import ScheduleList from './ScheduleList';

interface ScheduleStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const ScheduleStep = (props: ScheduleStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const formDetails = useAppSelector((state) => state.maintenance.planForm);
  const formik = useFormik({
    initialValues: {
      schedules: formDetails.schedules ?? [],
    },
    validationSchema: planScheduleSchema(type === 'create', false, false),
    enableReinitialize: true,

    onSubmit: async () => {
      setActiveStep(3);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="24px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="8px"
            pl="25px"
            pb="33px"
            pr="34px"
            rounded="6px"
            minH="60vh"
          >
            <ScheduleList
              type={type}
              showScheduleInfo={showScheduleForm}
              setShowScheduleInfo={setShowScheduleForm}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectMultiple={false}
            />
            <SlideTransition trigger={showScheduleForm}>
              <ScheduleForm setShowScheduleForm={setShowScheduleForm} />
            </SlideTransition>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={3}
              activeStep={2}
              setActiveStep={setActiveStep}
              disableBackButton={showScheduleForm}
              disablePrimaryButton={showScheduleForm}
              handleContinue={() => console.log({ error: formik.errors })}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ScheduleStep;
