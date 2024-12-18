import * as Yup from 'yup';

const generateReportSchema = () =>
  Yup.object().shape({
    criterion: Yup.array()
      .of(
        Yup.object().shape({
          columnName: Yup.string().required('Column Name is Required'),
          columnValue: Yup.string().required('Column Value is Required'),
          operation: Yup.number().required('Operation is Required'),
          join: Yup.number().required('Join is Required'), // this is either and or OR ... /the last one doesn't need to be required
        })
      )
      .required('Criterion is Required'),
    contextTypeId: Yup.number().required('Context Type ID is Required'),
    orderByCriteria: Yup.object().shape({
      columnName: Yup.string().required('Column Name is Required'),
      operation: Yup.number().required('Operation is Required'),
    }),
    pageNumber: Yup.number().min(0, 'Page Number must be 0 or greater'),
    pageSize: Yup.number().min(0, 'Page Size must be 0 or greater'),
  });

export { generateReportSchema };
