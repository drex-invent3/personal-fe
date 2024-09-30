import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import AddDocument from '../../AssetForm/DocumentStep/AddDocument';

const SupportingDocuments = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Supporting Documents</DetailHeader>
      <AddDocument variant="secondary" />
    </VStack>
  );
};

export default SupportingDocuments;
