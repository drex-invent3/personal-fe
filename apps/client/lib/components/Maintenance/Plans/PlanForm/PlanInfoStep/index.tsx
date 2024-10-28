import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import AssetTypeSelect from '~/lib/components/Common/AssetTypeSelect';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import { useGetAssetTypeByIdQuery } from '~/lib/redux/services/asset/types.services';
import { useGetAssetCustomMaintenancePlanByAssetGuidQuery } from '~/lib/redux/services/maintenance/plan.services';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import { MAINTENANCE_PLAN_ENUM, planScopeOptions } from '~/lib/utils/constants';
import PlanTitle from '../../Common/PlanTitle';
import Owner from '../../Common/Owner';
import StartDate from '../../Common/StartDate';
import EndDate from '../../Common/EndDate';
import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import TemplateButton from '../../Common/TemplateButton';
import moment from 'moment';

interface PlanInfoStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const PlanInfoStep = (props: PlanInfoStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const maintenanceSlice = useAppSelector((state) => state.maintenance);
  const plan = maintenanceSlice.planForm;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [isDefaultPlan, setIsDefaultPlan] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [inputtedStartDate, setInputtedStartDate] = useState<
    string | undefined
  >(undefined);

  const initialValues = {
    planName: plan?.planName ?? null,
    frequencyId: plan?.frequencyId ?? null,
    startDate: plan?.startDate ?? null,
    endDate: plan?.endDate ?? null,
    ownerId: plan?.ownerId ?? null,
    assetId: plan?.assetId ?? null,
    assetTypeId: plan?.assetTypeId ?? null,
    cost: plan?.cost ?? null,
    planScope: plan?.planName
      ? plan?.assetId
        ? 'asset'
        : 'asset_group'
      : 'asset_group',
  };
  const previousDay = moment().subtract(1, 'days').format('DD/MM/YYYY');

  const formik = useFormik({
    initialValues,
    validationSchema: planSchema(
      isDefaultPlan,
      true,
      previousDay,
      inputtedStartDate
    ),
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(
        updatePlanForm({
          planName: values.planName,
          ownerId: values.ownerId,
          ...(values.planScope === 'asset'
            ? { assetId: values.assetId }
            : { assetTypeId: values.assetTypeId }),
          startDate: values.startDate,
          endDate: values.endDate,
          planTypeId: isDefaultPlan
            ? MAINTENANCE_PLAN_ENUM.default
            : MAINTENANCE_PLAN_ENUM.custom,
          planTypeName: isDefaultPlan ? 'Default' : 'Custom',
        })
      );
      setActiveStep(1);
    },
  });

  const { data: assetData } = useGetAssetInfoHeaderByIdQuery(
    formik.values.assetId,
    { skip: !formik.values.assetId }
  );
  const { data: assetTypeData } = useGetAssetTypeByIdQuery(
    formik.values.assetTypeId,
    { skip: !formik.values.assetTypeId }
  );
  const { data: assetCustomPlans, error } =
    useGetAssetCustomMaintenancePlanByAssetGuidQuery(assetData?.data?.guid, {
      skip: !assetData?.data?.guid,
    });

  // Handles Toast Error
  const showToast = (description: string) => {
    toast({
      title: 'Error',
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Set if it is a default plan to be created or not based on the plan scope (Used for Schema validation)
  useEffect(() => {
    if (formik.values.planScope) {
      if (formik.values.planScope === 'asset') {
        setIsDefaultPlan(false);
      } else {
        setIsDefaultPlan(true);
      }
    }
  }, [formik.values.planScope]);

  // Reset Proceed Flag to false if assetId and assetTypeId is changed
  useEffect(() => {
    setCanProceed(false);
  }, [formik.values.assetId, formik.values.assetTypeId]);

  // Proceed if either the asset of asset type selected doesn't have a maintenance plan
  useEffect(() => {
    if (assetCustomPlans || assetTypeData || error) {
      if (formik.values.planScope === 'asset') {
        if (error) {
          setCanProceed(true);
        } else if (
          type === 'create' ||
          plan?.assetId !== formik.values.assetId
        ) {
          showToast('This Asset already have a customized maintenance plan');
        } else {
          setCanProceed(true);
        }
      }
      if (formik.values.planScope === 'asset_type') {
        if (assetTypeData?.data?.maintenancePlanId === null) {
          setCanProceed(true);
        } else {
          showToast('This Asset Type already have a default maintenance plan');
        }
      }
    }
  }, [assetTypeData, error, assetCustomPlans]);

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 0 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="24px"
            pr="41px"
            rounded="6px"
            minH="60vh"
          >
            <VStack width="full" spacing="36px">
              <SimpleGrid columns={2} gap="40px" width="full">
                <HStack width="full" spacing="40px">
                  <Flex width="full" maxW="141px">
                    <SectionInfo
                      title="Plan Scope"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  <HStack spacing="73px">
                    {planScopeOptions.map((item, index) => (
                      <HStack key={index} spacing="16px">
                        <Flex
                          width="18px"
                          height="18px"
                          flexShrink={0}
                          bgColor="neutral.300"
                          rounded="full"
                          justifyContent="center"
                          alignItems="center"
                          cursor="pointer"
                          onClick={() =>
                            formik.setFieldValue('planScope', item.value)
                          }
                        >
                          {formik.values.planScope === item.value && (
                            <Box
                              width="10px"
                              height="10px"
                              rounded="full"
                              bgColor="primary.500"
                            />
                          )}
                        </Flex>
                        <Text color="black" size="md">
                          {item.label}
                        </Text>
                      </HStack>
                    ))}
                  </HStack>
                </HStack>
              </SimpleGrid>
              {formik.values.planScope && (
                <SimpleGrid columns={2} gap="40px" width="full">
                  <HStack width="full" alignItems="flex-start" spacing="40px">
                    <Flex width="full" maxW="141px">
                      <SectionInfo
                        title={
                          formik.values.planScope === 'asset'
                            ? 'Asset'
                            : 'Asset Type'
                        }
                        info="Add name that users can likely search with"
                        isRequired
                      />
                    </Flex>
                    {formik.values.planScope === 'asset' ? (
                      <AssetSelect
                        selectName="assetId"
                        selectTitle="Asset"
                        defaultInputValue={plan?.assetName}
                        handleSelect={(option) =>
                          dispatch(updatePlanForm({ assetName: option.label }))
                        }
                      />
                    ) : (
                      <AssetTypeSelect
                        selectName="assetTypeId"
                        selectTitle="Asset Type"
                        defaultInputValue={plan?.assetTypeName}
                        handleSelect={(option) =>
                          dispatch(
                            updatePlanForm({ assetTypeName: option.label })
                          )
                        }
                      />
                    )}
                  </HStack>
                  <TemplateButton handleClick={() => {}}>
                    Select from Template
                  </TemplateButton>
                </SimpleGrid>
              )}
              <HStack width="full" spacing="40px">
                <PlanTitle sectionMaxWidth="141px" spacing="40px" />
                <Owner
                  sectionMaxWidth="141px"
                  spacing="40px"
                  defaultName={plan?.owner}
                />
              </HStack>

              <HStack width="full" spacing="40px">
                <StartDate
                  sectionMaxWidth="141px"
                  spacing="40px"
                  handleSelectedDate={(date) => setInputtedStartDate(date)}
                />
                <EndDate
                  sectionMaxWidth="141px"
                  spacing="40px"
                  minDate={
                    inputtedStartDate
                      ? moment(inputtedStartDate, 'DD/MM/YYYY').toDate()
                      : new Date()
                  }
                />
              </HStack>
            </VStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={3}
              activeStep={0}
              setActiveStep={setActiveStep}
              disablePrimaryButton={!canProceed}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default PlanInfoStep;
