import { FilterDropDown } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAllAssetCategoryQuery } from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface CategoryFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
}
const CategoryFilter = (props: CategoryFilterProps) => {
  const { selectedOptions, handleSelectedOption } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetAllAssetCategoryQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCategories = generateOptions(
        data?.data?.items,
        'categoryName',
        'categoryId'
      );
      setOptions((prev) => [...prev, ...newCategories]);
    }
  }, [data]);

  return (
    <FilterDropDown
      label="Category:"
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading}
    />
  );
};

export default CategoryFilter;
