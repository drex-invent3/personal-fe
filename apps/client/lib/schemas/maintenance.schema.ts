import * as Yup from 'yup';
import { taskBaseSchema } from './task.schema';
import { createDateSchema } from './general.schema';

const scheduleSchema = (
  validateTask: boolean,
  validateAsset: boolean,
  validatePlanId: boolean,
  minScheduleDate?: string,
  maxScheduleDate?: string
) =>
  Yup.object().shape({
    localId: Yup.number().nullable(),
    name: Yup.string().required('Title is Required'),
    sla: Yup.number().nullable(),
    typeId: Yup.string().required('Type is Required'),
    frequencyId: Yup.string().required('Frequency is Required'),
    description: Yup.string().required('Description is Required'),
    comment: Yup.string().nullable(),
    scheduledDate: createDateSchema(
      true,
      true,
      minScheduleDate,
      maxScheduleDate
    ).required('Schedule Date is Required'),
    completionDate: Yup.string().nullable(),
    ticketId: Yup.number().nullable(),
    ...(validatePlanId
      ? { planId: Yup.number().required('Plan is Required') }
      : { planId: Yup.number().nullable() }),
    ...(validateAsset
      ? { assetId: Yup.number().required('Asset is Required') }
      : { assetId: Yup.number().nullable() }),
    ...(validateTask
      ? {
          taskCount: Yup.number()
            .required('Tasks is required')
            .min(1, 'There must be atleast one task'),
          tasks: Yup.array()
            .of(taskBaseSchema(minScheduleDate))
            .required('Tasks are required')
            .min(1, 'There must be atleast one task'),
        }
      : {
          taskCount: Yup.number().nullable(),
          tasks: Yup.array().of(taskBaseSchema(minScheduleDate)).notRequired(),
        }),
  });

const planSchema = (
  isDefaultPlan: boolean,
  validateBasedOnPlanScope: boolean,
  minStartDate?: string,
  minEndDate?: string
) =>
  Yup.object().shape({
    planName: Yup.string().required('Name is Required'),
    startDate: createDateSchema(false, true, minStartDate).required(
      'Start Date is Required'
    ),
    endDate: createDateSchema(false, false, minEndDate).nullable(),
    ownerId: Yup.number().required('Owner is Required'),
    cost: Yup.number().nullable(),

    // Conditionally add based on `validateBasedOnPlanType` and `isDefaultPlan`
    ...(validateBasedOnPlanScope && {
      planScope: Yup.string().required('Plan Scope is Required'),
      ...(isDefaultPlan
        ? {
            assetTypeId: Yup.number().required('Asset Type is Required'),
            assetId: Yup.number().nullable(),
          }
        : {
            assetId: Yup.number().required('Asset is Required'),
            assetTypeId: Yup.number().nullable(),
          }),
    }),
  });

const planScheduleSchema = (
  validateTask: boolean,
  validateAsset: boolean,
  validatePlanId: boolean
) =>
  Yup.object().shape({
    schedules: Yup.array()
      .of(scheduleSchema(validateTask, validateAsset, validatePlanId))
      .required('Schedule is required')
      .min(1, 'There must be atleast one schedule'),
  });
export { scheduleSchema, planSchema, planScheduleSchema };
