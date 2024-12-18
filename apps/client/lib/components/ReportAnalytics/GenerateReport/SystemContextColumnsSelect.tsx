import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { assetColumns, tasksColumns, ticketColumns,maintenancePlanColumns,maintenanceScheduleColumns } from './dummyData';

interface SystemContextColumnsSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect: (options: Option) => void;
  selectedContextTypeId: number | undefined;
  selectedOptions: Option[];
}
const SystemContextColumnsSelect = (props: SystemContextColumnsSelectProps) => {
  const { handleSelect, selectedOptions, selectedContextTypeId } = props;

  const selectedItems = () => {
    switch (selectedContextTypeId) {
      case 1:
        return assetColumns;

      case 2:
        return tasksColumns;

      case 3:
        return ticketColumns;

      case 4:
        return maintenancePlanColumns;

      case 5:
        return maintenanceScheduleColumns;

      default:
        return [];
    }
  };

  return (
    <FilterDropDown
      label=""
      options={generateOptions(selectedItems(), 'columnName', 'columnId')}
      handleClick={handleSelect}
      selectedOptions={selectedOptions}
      containerStyles={{
        maxW: 'none',
      }}
      labelStyles={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      chevronStyles={{
        boxSize: '16px',
      }}
    />
  );
};

export default SystemContextColumnsSelect;
