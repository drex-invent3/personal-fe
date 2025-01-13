'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import AssetDispose from '~/lib/components/AssetManagement/AssetDispose';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: params.id! },
    { skip: params.id === undefined }
  );

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }
  if (!data?.data) return notFound();

  return <AssetDispose data={data?.data} />;
}
