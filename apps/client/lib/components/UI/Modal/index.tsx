import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalContentProps,
} from '@chakra-ui/react';

interface IGenericModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentStyle?: ModalContentProps;
  mainModalStyle?: { [key: string]: unknown };
}
function GenericModal({
  isOpen,
  onClose,
  children,
  contentStyle,
  mainModalStyle,
}: IGenericModal) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      isCentered
      scrollBehavior="inside"
      trapFocus={false}
      {...mainModalStyle}
    >
      <ModalOverlay />

      <ModalContent
        maxW={{ base: '90vw', sm: 'full' }}
        width="full"
        rounded="8px"
        bgColor="white"
        p={0}
        m={0}
        {...contentStyle}
      >
        {children}
      </ModalContent>
    </Modal>
  );
}

export default GenericModal;
