import React, { useState } from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import TaskTable from '../../Tables/TaskTable';

interface TaskListViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: number;
  showPopover: boolean;
}
const TaskListView = (props: TaskListViewProps) => {
  const { isOpen, onClose, scheduleId, showPopover } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery({
    id: scheduleId,
    pageSize,
    pageNumber: currentPage,
  });

  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={showPopover}
      scheduleId={scheduleId}
      taskType="main"
    >
      <TaskTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={false}
        type="drawer"
      />
    </TaskListDrawer>
  );
};

export default TaskListView;
