import {
  Flex,
  Grid,
  GridItem,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import AddButton from '../../AddButton';
import CategorySelect from './CategorySelect';
import CategoryModal from './Modals/CategoryModal';
import SubCategoryModal from './Modals/SubCategoryModal';
import SubCategorySelect from './SubCategorySelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

const AssetCategory = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((state) => state.asset.assetForm);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenSubCategory,
    onClose: onCloseSubCategory,
    onOpen: onOpenSubCategory,
  } = useDisclosure();

  return (
    <>
      <HStack width="full" alignItems="flex-start" spacing="104px">
        <Flex width="full" maxW="118px">
          <SectionInfo
            title="Category"
            info="Choose the category and the sub-category"
            isRequired
          />
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
          <GridItem colSpan={3}>
            <HStack spacing="11px" alignItems="flex-start">
              <VStack alignItems="flex-end" width="full">
                <CategorySelect
                  handleSelect={(option) => {
                    dispatch(
                      updateAssetForm({
                        categoryId: option.value as number,
                        categoryName: option.label,
                      })
                    );
                  }}
                />
                <AddButton handleClick={onOpen}>Add New Category</AddButton>
              </VStack>
              <VStack alignItems="flex-end" width="full">
                <SubCategorySelect
                  categoryId={categoryId}
                  handleSelect={(option) => {
                    dispatch(
                      updateAssetForm({ subCategoryName: option.label })
                    );
                  }}
                />
                <AddButton handleClick={onOpenSubCategory}>
                  Add New Subcategory
                </AddButton>
              </VStack>
            </HStack>
          </GridItem>
        </Grid>
      </HStack>
      <CategoryModal isOpen={isOpen} onClose={onClose} />
      <SubCategoryModal
        isOpen={isOpenSubCategory}
        onClose={onCloseSubCategory}
      />
    </>
  );
};

export default AssetCategory;
