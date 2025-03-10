import { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllTicketTypesQuery,
  useSearchTicketTypesMutation,
} from '~/lib/redux/services/ticket.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface TicketTypeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const TicketTypeSelect = (props: TicketTypeSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchTicketType] = useSearchTicketTypesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllTicketTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="ticketTypeName"
      valueKey="ticketTypeId"
      mutationFn={searchTicketType}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
    />
  );
};

export default TicketTypeSelect;
