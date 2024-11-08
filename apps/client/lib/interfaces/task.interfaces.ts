interface Task {
  rowId: number;
  taskId: number;
  taskName: string;
  taskDescription: string;
  assignedTo: number;
  assignedToEmployeeName: string;
  dateCreated: string;
  dueDate: string;
  dateCompleted: string;
  costEstimate: number;
  actualCost: number;
  comments: string;
  isDeleted: boolean;
  taskTypeId: number;
  taskType: string;
  taskPriorityId: number;
  priorityName: string;
  status: string;
  statusId: number;
  scheduleId: number;
  assetId: number;
  assetCode: string;
  assetSerialNo: string;
  assetDescription: string;
  stateId: number;
  countryId: number;
  locationId: number;
  facilityName: string;
  facilityRef: string;
  facilityAddress: string;
  facilityLongitude: number;
  facilityLatitude: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  floor: string;
  floorRef: string;
  department: string;
  departmentRef: string;
  room: string;
  roomRef: string;
  aisle: string;
  aisleRef: string;
  shelf: string;
  shelfRef: string;
  assetLocation: string;
}

interface baseTaskFormDetail {
  taskTypeId: number | null;
  taskName: string | null;
  taskDescription: string | null | undefined;
  priorityId: number | null;
  assignedTo: number | null;
  dueDate: string | null;
  dateCompleted: string | null;
  costEstimate: number | null;
  actualCost: number | null;
  comments: string | null;
  scheduleId: number | null;
}

interface FormDetails {
  taskId: number | null;
  localId: number | null;
  taskType: string | null;
  statusId: number | null;
  status: string | null;
  priorityName: string | null;
  assignedToEmployeeName: string | null;
  assetId: number | null;
  assetName: string | null;
  assetLocation: string | null;
}

interface TaskStatus {
  taskStatusId: number;
  statusName: string;
  statusCategoryId: number | null;
  alias: string | null;
  displayColorCode: string;
  isNew: boolean;
  createdDate: string;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
}

interface TaskPriority {
  taskPriorityId: number;
  priority: string;
  lastModifiedBy: string;
  lastModifiedDate: string | null;
  isNew: boolean;
  isDeleted: boolean;
  guid: string;
  displayColorCode: string;
  deletedDate: string | null;
  deletedBy: string;
  createdDate: string;
  createdBy: string;
}

interface taskFormDetails extends baseTaskFormDetail, FormDetails {}

export type {
  Task,
  baseTaskFormDetail,
  taskFormDetails,
  TaskStatus,
  TaskPriority,
};
