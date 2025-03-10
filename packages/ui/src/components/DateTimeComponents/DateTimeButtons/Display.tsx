import moment from 'moment';
import { Range as DateRange } from 'react-date-range';
import Button from '../../Button';
import DimissibleContainer from '../../DimissibleContainer';

interface DisplayProps {
  selectedDate?: string | undefined;
  selectedTime: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDateTimeSelect?: (dateTime: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  handleRange?: (info: DateRange) => void;
  prefix?: string;
  onOpenCustomDate: () => void;
  includeTime: boolean;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  isRange: boolean;
  range?: DateRange;
}

const Display = (props: DisplayProps) => {
  const {
    handleDateTimeSelect,
    handleRange,
    onOpenCustomDate,
    includeTime,
    selectedDate,
    selectedTime,
    prefix,
    setTime,
    isRange,
    range,
  } = props;

  const getDisplayText = () => {
    if (!selectedDate) return '';

    const now = moment().startOf('day');
    const date = moment(selectedDate, 'DD/MM/YYYY').startOf('day');
    const dayDifference = date.diff(now, 'days');

    const displayTime =
      includeTime && selectedTime
        ? moment(selectedTime, ['HH:mm']).format('hh:mm A')
        : '';

    const displayTemplate = (text: string) => {
      return `${prefix ? `${prefix} ` : ''}${text}${displayTime ? `, ${displayTime}` : ''}`;
    };

    if (dayDifference === 0) {
      return displayTemplate('Today');
    } else if (dayDifference === 1) {
      return displayTemplate('Tomorrow');
    } else if (dayDifference == 7) {
      return displayTemplate(`Next ${date.format('dddd')}`);
    } else {
      return displayTemplate(
        `${moment(selectedDate, 'DD/MM/YYYY').format(
          `${includeTime && displayTime ? 'MMM' : 'MMMM'} D, YYYY`
        )}`
      );
    }
  };

  if (selectedDate || range?.startDate) {
    return (
      <DimissibleContainer
        handleClose={() => {
          setTime(undefined);
          if (handleDateTimeSelect) {
            handleDateTimeSelect(null);
          }
          if (handleRange) {
            handleRange({ startDate: undefined, endDate: undefined });
          }
        }}
      >
        <Button
          customStyles={{ height: '37px', py: '10px' }}
          handleClick={onOpenCustomDate}
        >
          {!isRange
            ? getDisplayText()
            : range
              ? `${moment(range.startDate).format('D MMM YYYY')} - ${moment(range.endDate).format('D MMM YYYY')}`
              : ''}
        </Button>
      </DimissibleContainer>
    );
  }

  return null;
};

export default Display;
