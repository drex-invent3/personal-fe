import {
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NumberPagination from '../NumberPagination';
import { ChevronDownIcon, ChevronUpIcon } from '../../CustomIcons';

interface PaginationProps {
  totalPage: number;
  pageNumber?: number;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = (props: PaginationProps) => {
  const { pageSize, setPageSize, totalPage, pageNumber, setPageNumber } = props;
  const [inputValue, setInputValue] = useState(pageSize);

  useEffect(() => {
    // Set a timeout to wait for 3 seconds before calling setPageSize
    const timeoutId = setTimeout(() => {
      if (setPageSize) {
        setPageSize((prev) => (inputValue ? inputValue : prev));
      }
    }, 3000); // 3 seconds delay

    // Cleanup function to clear timeout if the user types again before 3 seconds
    return () => clearTimeout(timeoutId);
  }, [inputValue, setPageSize]);

  return (
    <HStack bgColor="white" py="8px" px="16px" spacing="16px" rounded="6px">
      <HStack spacing="16px">
        <Text color="neutral.800" whiteSpace="nowrap">
          Rows per page
        </Text>
        <NumberInput
          defaultValue={pageSize}
          min={1}
          onChange={(value) => setInputValue(+value > 0 ? +value : inputValue)}
          size="sm"
        >
          <NumberInputField
            width="50px"
            color="black"
            fontWeight={800}
            fontSize="12px"
            lineHeight="14.26px"
            borderColor="neutral.300"
            rounded="4px"
            _focusVisible={{ borderColor: 'neutral.300' }}
            padding="6px"
            paddingRight="20px"
          />
          <NumberInputStepper sx={{ pl: '4px' }}>
            <NumberIncrementStepper
              sx={{
                border: 'none',
                padding: 0,
              }}
            >
              <Icon as={ChevronUpIcon} boxSize="10px" color="black" />
            </NumberIncrementStepper>
            <NumberDecrementStepper
              sx={{
                border: 'none',
                padding: 0,
              }}
            >
              <Icon as={ChevronDownIcon} boxSize="10px" color="black" />
            </NumberDecrementStepper>
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <NumberPagination
        currentPage={pageNumber ?? 1}
        onPageChange={setPageNumber}
        totalPage={totalPage}
      />
    </HStack>
  );
};

export default Pagination;
