import { Box, HStack, StackProps, Text } from '@chakra-ui/react';

interface GenericStatusBoxProps extends StackProps {
  colorCode?: string | null;
  text: string;
}
const GenericStatusBox = (props: GenericStatusBoxProps) => {
  const { colorCode = '#8595A5', text, ...rest } = props;
  return (
    <HStack
      padding="6px"
      borderWidth="1px"
      borderColor={`${colorCode}80`}
      bgColor={`${colorCode}0D`}
      rounded="6px"
      spacing="8px"
      width="max-content"
      {...rest}
    >
      <Box
        width="8px"
        height="8px"
        rounded="full"
        bgColor={colorCode ?? '#8595A5'}
        flexShrink={0}
      />
      <Text
        color="black"
        textOverflow="ellipsis"
        noOfLines={2}
        textTransform="capitalize"
        overflow="hidden"
        flex="1"
      >
        {text}
      </Text>
    </HStack>
  );
};

export default GenericStatusBox;
