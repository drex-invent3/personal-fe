import { Text, VStack } from '@chakra-ui/react';
import { Button, GenericSuccessModal } from '@repo/ui/components';

interface MarkAsCompletedSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}
const MarkAsCompletedSuccessModal = (
  props: MarkAsCompletedSuccessModalProps
) => {
  const { isOpen, onClose, id } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          You have successfully marked Task{' '}
          <Text as="span" fontWeight={800}>
            {id}
          </Text>{' '}
          as completed
        </Text>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default MarkAsCompletedSuccessModal;
