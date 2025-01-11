import { HStack, useDisclosure } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import PlanTemplateModal from '../Plans/PlanTemplateModal';
import ScheduleTemplateModal from '../Schedules/ScheduleTemplateModal';
import ActionButtonPopover from '../../UI/ActionButtonsPopover';

const Header = () => {
  const pathname = usePathname();
  const [tabName, setTabName] = useState<string | null>(null);
  const {
    isOpen: isOpenPlanTemplate,
    onClose: onClosePlanTemplate,
    onOpen: onOpenPlanTemplate,
  } = useDisclosure();
  const {
    isOpen: isOpenScheduleTemplate,
    onClose: onCloseScheduleTemplate,
    onOpen: onOpenScheduleTemplate,
  } = useDisclosure();

  useEffect(() => {
    // Define a mapping for the paths to tab names
    const tabMapping: Record<string, string> = {
      plans: 'Plans',
      maintenance: 'Plans',
      schedules: 'Schedules',
    };

    // Get the last segment of the pathname
    const lastPath = pathname.split('/').pop() || ''; // Add fallback to an empty string in case `pop()` is undefined

    // Set the tab name based on the mapping or default to null
    setTabName(tabMapping[lastPath] ?? null);
  }, [pathname]);

  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Maintenance</PageHeader>
      {tabName?.toLowerCase() === 'plans' && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpenPlanTemplate}
          newRoute="/maintenance/plans/add"
          buttonLabel="Add New Plan"
          linkLabel="Create a New Plan"
          modalLabel="Create From Template"
        >
          {isOpenPlanTemplate && (
            <PlanTemplateModal
              isOpen={isOpenPlanTemplate}
              onClose={onClosePlanTemplate}
            />
          )}
        </ActionButtonPopover>
      )}
      {tabName?.toLowerCase() === 'schedules' && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpenScheduleTemplate}
          newRoute="/maintenance/schedules/add"
          buttonLabel="Add New Schedule"
          linkLabel="Create a New Schedule"
          modalLabel="Create From Template"
        >
          {isOpenScheduleTemplate && (
            <ScheduleTemplateModal
              isOpen={isOpenScheduleTemplate}
              onClose={onCloseScheduleTemplate}
            />
          )}
        </ActionButtonPopover>
      )}
    </HStack>
  );
};

export default Header;
