'use client';

import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { useAppSelector } from '~/lib/redux/hooks';
import { taskSchema } from '~/lib/schemas/task.schema';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '~/lib/redux/services/task/general.services';
import Header from './Header';
import TaskSuccessModal from '../Modals/TaskSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import withFormLeaveDialog from '../../UI/Form/FormLeaveDialogProvider';

interface TaskFormProps {
  type: 'create' | 'edit';
}
const TaskForm = (props: TaskFormProps) => {
  const { type } = props;
  const formDetails = useAppSelector((state) => state.task.taskForm);
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation({});
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

  const defaultHeader = type === 'create' ? 'Add New Task' : 'Edit Task';

  const previousDay = moment().subtract(1, 'days').format('DD/MM/YYYY');

  const formik = useFormik({
    initialValues: {
      scheduleId: formDetails?.scheduleId ?? null,
      taskId: formDetails?.taskId ?? null,
      taskTypeId: formDetails?.taskTypeId ?? null,
      taskType: formDetails?.taskType ?? null,
      taskName: formDetails?.taskName ?? null,
      taskDescription: formDetails?.taskDescription ?? undefined,
      priorityId: formDetails?.priorityId ?? null,
      priorityName: formDetails?.priorityName ?? null,
      taskStatusId: formDetails?.statusId ?? null,
      taskStatusName: formDetails?.status ?? null,
      assignedTo: formDetails?.assignedTo ?? null,
      assignedToEmployeeName: formDetails?.assignedToEmployeeName ?? null,
      dueDate: formDetails?.dueDate ?? null,
      costEstimate: formDetails?.costEstimate ?? null,
      actualCost: formDetails?.actualCost ?? null,
      comments: formDetails?.comments ?? null,
    },
    validationSchema: taskSchema(previousDay),
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      let response;
      const info = {
        taskTypeId: values.taskTypeId,
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        priorityId: values.priorityId,
        assignedTo: values.assignedTo,
        dueDate: moment(values.dueDate, 'DD/MM/YYYY').utcOffset(0, true),
        costEstimate: values.costEstimate,
        actualCost: values.actualCost,
        comments: values.comments,
        scheduleId: values.scheduleId,
      };
      if (type === 'edit') {
        response = await handleSubmit(
          updateTask,
          {
            ...info,
            id: values.taskId,
            taskId: values.taskId,
            lastModifiedBy: session?.user.id,
          },
          ''
        );
      } else {
        response = await handleSubmit(
          createTask,
          { ...info, createdBy: session?.user.id },
          ''
        );
      }
      if (response?.data) {
        resetForm();
        onOpenSuccess();
      }
    },
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header headingText={defaultHeader} />
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="37px"
            pl="16px"
            pb="33px"
            pr="30px"
            mt="40px"
            rounded="6px"
            minH="60vh"
            divider={<Divider borderColor="#BBBBBB" />}
          >
            <SectionOne />
            <SectionTwo />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              type="submit"
              cancelLink="/task-management"
              totalStep={0}
              activeStep={0}
              loadingText={isCreating ? 'Creating...' : 'Updating...'}
              isLoading={isCreating || isUpdating}
              handleContinue={() => console.log(formik.errors)}
            />
          </Flex>
        </form>
      </FormikProvider>
      <TaskSuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        type={type === 'edit' ? 'edit' : 'create'}
        format="page"
      />
    </Flex>
  );
};

export default withFormLeaveDialog(TaskForm);
