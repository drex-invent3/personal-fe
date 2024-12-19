'use client';
import { Flex, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { DataTable, GenericBreadCrumb } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { ViewReportTableData } from '~/lib/interfaces/report.interfaces';
import {
  useGetReportByIdQuery,
  useViewReportByIdQuery,
} from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PageHeader from '../../UI/PageHeader';
import ReportViewFilters from '../Filters/ReportViewFilters';

interface ReportViewProps {
  id: string;
}

const ReportView = (props: ReportViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [activeFilter, setActiveFilter] = useState<'general' | null>(null);

  const breadCrumbData = [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Report & Analytics',
      route: '#',
    },
  ];

  const { data: reportInfo, isLoading: loadingReportInfo } =
    useGetReportByIdQuery(props.id);

  const { data: reportTableData, isLoading: loadingReportTableData } =
    useViewReportByIdQuery(props.id);

  const columnHelper = createColumnHelper<any>();

  const generateDynamicColumns = (data: ViewReportTableData[]) => {
    if (!data || data.length === 0) return [];

    // Get keys from the first record to generate columns dynamically
    const dynamicKeys = Object.keys(data[0]?.model?.data || {});

    return dynamicKeys.map((key) => {
      return columnHelper.accessor(key, {
        cell: (info) => info.row.original.model.data[key],
        header: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Format key to readable header
        enableSorting: false,
      });
    });
  };

  const columns = useMemo(
    () => {
      const dynamicColumns = generateDynamicColumns(
        reportTableData?.data.items || []
      );

      return dynamicColumns;
    },
    [[reportTableData?.data.items]] //eslint-disable-line
  );

  return (
    <Flex width="full" direction="column" pb="24px" pt="12px">
      <VStack
        spacing="58px"
        alignItems="flex-start"
        width="full"
        pt="12px"
        borderBottom="1px solid #BBBBBB"
        paddingBottom="16px"
        marginBottom="16px"
      >
        <GenericBreadCrumb routes={breadCrumbData} />
        <Skeleton isLoaded={!loadingReportInfo} width="full" height="full">
          <HStack
            width="full"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack alignItems="start">
              <HStack spacing="16px">
                <PageHeader>{reportInfo?.data.reportName}</PageHeader>

                {reportInfo?.data.isDefaultReport && (
                  <Text
                    bg="#BBBBBB"
                    borderRadius="24px"
                    padding="6px 12px"
                    color="#0E2642"
                  >
                    Default
                  </Text>
                )}
              </HStack>

              <HStack>
                <Text
                  color="#838383"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="16.63px"
                  textTransform="capitalize"
                >
                  Created by: {reportInfo?.data.createdBy}
                </Text>

                <Text
                  color="#838383"
                  fontSize="12px"
                  lineHeight="14.26px"
                  fontWeight="500"
                >
                  |{' '}
                  {dateFormatter(
                    reportInfo?.data.createdDate,
                    'DD - MM - YYYY'
                  )}
                </Text>
              </HStack>
            </VStack>

            <Text
              color="#0E2642"
              fontSize="14px"
              fontWeight="500"
              lineHeight="16.63px"
            >
              Total Record: {reportTableData?.data.totalItems}
            </Text>

            {reportInfo?.data && (
              <ReportViewFilters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                report={reportInfo?.data}
              />
            )}
          </HStack>
        </Skeleton>
      </VStack>

      <DataTable
        columns={columns}
        data={reportTableData?.data.items ?? []}
        isLoading={loadingReportTableData}
        isFetching={loadingReportTableData}
        totalPages={reportTableData?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={5}
        isSelectable
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default ReportView;
