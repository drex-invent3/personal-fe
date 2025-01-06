import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useDeleteMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import { getSession } from 'next-auth/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

const PopoverAction = (plan: MaintenancePlan) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const { updateSearchParam } = useCustomSearchParams();
  const [deleteTask, { isLoading }] = useDeleteMaintenancePlanMutation({});

  const handleDeletePlan = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTask,
      { id: plan?.maintenancePlanId, deletedBy: session?.user.username! },
      'Plan Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            as="a"
            href={`/maintenance/plans/${plan.maintenancePlanId}/edit`}
          >
            Edit
          </Text>
          <Text
            cursor="pointer"
            onClick={() => {
              updateSearchParam('maintenancePlanId', plan?.maintenancePlanId);
            }}
          >
            View
          </Text>
          <Text cursor="pointer" onClick={onOpenDelete} color="#F50000">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      {isOpenDelete && (
        <GenericDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeletePlan}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
