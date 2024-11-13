import * as Yup from 'yup';
import { createDateSchema } from './general.schema';
import { taskBaseSchema } from './task.schema';

const scheduleTicketSchema = (minScheduledDate?: string) =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
    scheduledDate: createDateSchema(true, true, minScheduledDate).required(
      'Start Date is Required'
    ),
    tasks: Yup.array()
      .of(taskBaseSchema())
      .required('Tasks are required')
      .min(1, 'There must be atleast one task'),
    taskCount: Yup.number()
      .required('Tasks is required')
      .min(1, 'There must be atleast one task'),
  });

const updateTicketSchema = () =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
    status: Yup.string().required('Status is Required'),
    priority: Yup.string().required('Priority is Required'),
    ticketType: Yup.string().required('Ticket Type is Required'),
    tasks: Yup.array()
      .of(taskBaseSchema())
      .required('Tasks are required')
      .min(1, 'There must be atleast one task'),
    taskCount: Yup.number()
      .required('Tasks is required')
      .min(1, 'There must be atleast one task'),
  });

export { scheduleTicketSchema, updateTicketSchema };
