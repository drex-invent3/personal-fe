import { useField } from 'formik';
import SelectInput, { SelectInputProps } from '../Select';
// eslint-disable-next-line no-redeclare
import { Option } from '../../interfaces/general.interfaces';

interface FormSelectProps
  extends Omit<SelectInputProps, 'selectedOptions' | 'handleSelect'> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (option: Option) => void;
}

const FormSelect = (props: FormSelectProps) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <SelectInput
      {...field}
      isInvalid={meta.touched && !!meta.error}
      {...props}
      errorMessage={meta.error}
      selectedOption={meta.value}
      handleSelect={(option) => {
        helpers.setValue(option?.value);
        props.onSelect && props.onSelect(option);
      }}
    />
  );
};

export default FormSelect;
