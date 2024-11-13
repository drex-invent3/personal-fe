import {
  HStack,
  Icon,
  Text,
  VStack,
  Flex,
  useDisclosure,
  Collapse,
  useOutsideClick,
  Spinner,
} from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { ChevronDownIcon } from '../CustomIcons';
import CheckBox from './CheckBox';
import { useRef, useEffect, ReactNode } from 'react';

interface FilterDropDownProps {
  label: string;
  options: Option[];
  selectedOptions: (string | number)[];
  // eslint-disable-next-line no-unused-vars
  handleClick: (value: string | number) => void;
  loadMoreOptions?: () => void;
  hasMoreOptions?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  showBorder?: boolean;
}

const FilterDropDown = ({
  label,
  options,
  selectedOptions,
  handleClick,
  loadMoreOptions,
  hasMoreOptions,
  isLoading,
  children,
  showBorder,
}: FilterDropDownProps) => {
  const { onToggle, isOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  // Scroll handler to load more options when scrolled to 50%
  const handleScroll = () => {
    if (!listRef.current || isLoading || !hasMoreOptions) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const reached50Percent = scrollTop >= (scrollHeight - clientHeight) / 2;

    if (reached50Percent && loadMoreOptions && !isLoading) {
      loadMoreOptions();
    }
  };

  useEffect(() => {
    if (!hasMoreOptions) return; // Only add event listener if more options are available

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMoreOptions, handleScroll]);

  return (
    <Flex direction="column" width="full" maxW="max-content" ref={containerRef}>
      <HStack
        onClick={onToggle}
        cursor="pointer"
        bgColor="white"
        width="full"
        height="36px"
        py="10px"
        px="12px"
        rounded="6px"
        ref={buttonRef}
        border={showBorder ? '1px solid #DADFE5' : 'none'}
      >
        <HStack spacing="8px">
          <Text width="full" whiteSpace="nowrap" color="neutral.600">
            {label}
          </Text>
          <HStack spacing="4px" fontWeight={700}>
            <Text py="1px" px="4px" rounded="3px" border="1px solid #BBBBBB">
              {options.length >= 1 && options.length === selectedOptions.length
                ? 'All'
                : selectedOptions.length}
            </Text>
            <Text>Selected</Text>
          </HStack>
        </HStack>
        <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
      </HStack>

      <Collapse in={isOpen}>
        <VStack
          ref={listRef}
          spacing="8px"
          alignItems="flex-start"
          direction="column"
          bgColor="white"
          py="8px"
          px="12px"
          rounded="6px"
          mt="2px"
          position="absolute"
          zIndex={99}
          boxShadow="md"
          minW={buttonRef?.current?.offsetWidth}
          maxW="max-content"
          height="min-content"
          maxH="200px"
          overflow="auto"
        >
          {children ??
            options.map((option) => (
              <HStack key={option.value} spacing="8px">
                <CheckBox
                  isChecked={selectedOptions.includes(option.value)}
                  handleChange={() => handleClick(option.value)}
                />
                {<Text color="neutral.800">{option.label}</Text>}
              </HStack>
            ))}
          {isLoading && (
            <HStack justify="center" w="full">
              <Text>Loading...</Text>
              <Spinner size="sm" />
            </HStack>
          )}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default FilterDropDown;
