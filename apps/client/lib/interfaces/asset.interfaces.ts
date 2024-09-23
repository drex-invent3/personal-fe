interface AssetLocation {
  locationId: number;
  locationGuid: string | null;
  facilityId: number;
  facilityName: string;
  facilityRef: string;
  facilityAdress: string;
  longitude: number;
  latitude: number;
  buildingId: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  floorId: number;
  floorName: string;
  floorRef: string;
  departmentId: number;
  departmentName: string;
  departmentRef: string;
  roomId: number;
  roomName: string;
  roomRef: string;
  aisleId: number;
  aisleName: string;
  aisleRef: string;
  shelfId: number;
  shelfName: string;
  shelfRef: string;
}

type AssetStatusType =
  | 'Active'
  | 'Inactive'
  | 'Under Maintenance'
  | 'Decommissioned'
  | 'Pending Disposal'
  | 'In Storage'
  | 'Operational'
  | 'Non-Operational'
  | 'Scheduled for Maintenance'
  | 'Out of Service';

interface Asset {
  rowId: number | null;
  guid: string | null;
  primaryImage: string | null;
  assetId: number | null;
  brandName: string | null;
  modelRef: string | null;
  assetName: string | null;
  assetCode: string | null;
  assetTag: string | null;
  rfidtag: string | null;
  serialNo: string | null;
  lifeExpectancy: number | null;
  acquisitionDate: string | null;
  currentOwner: string | null;
  assignedTo: string | null;
  responsibleFor: string | null;
  purchaseDate: string | null;
  initialValue: number | null;
  resalevalue: number | null;
  dateCreated: string | null;
  scrapvalue: number | null;
  parentId: number | null;
  isDeleted: boolean;
  assetType: string | null;
  currentStatus: AssetStatusType;
  assetCategory: string | null;
  assetSubCategory: string | null;
  categoryId: number | null;
  subCategoryId: number | null;
  statusId: number | null;
  assetTypeId: number | null;
  conditionId: number | null;
  currentCondition: string | null;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  locationId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  aisleId: number | null;
  shelfId: number | null;
  facilityName: string | null;
  facilityRef: string | null;
  facilityAddress: string | null;
  facilityLongitude: number | null;
  facilityLatitude: number | null;
  buildingName: string | null;
  buildingRef: string | null;
  buildingAddress: string | null;
  buildingLongitude: number | null;
  buildingLatitude: number | null;
  floorName: string | null;
  floorRef: string | null;
  departmentName: string | null;
  departmentRef: string | null;
  roomName: string | null;
  roomRef: string | null;
  aisleName: string | null;
  aisleRef: string | null;
  shelfName: string | null;
  shelfRef: string | null;
  description: string | null;
  assetComponentId: number | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  currentCost: number | null;
  maintenanceCost: number | null;
  y2dmaintenanceCost: number | null;
}

interface AssetFormImages {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  isPrimaryImage: boolean;
}

interface AssetFormDetails {
  images: AssetFormImages[];
  assetId: number | null;
  assetName: string | null;
  brandName: string | null;
  modelRef: string | null;
  description: string | null;
  serialNo: string | null;
  categoryId: number | null;
  subCategoryId: number | null;
  weightKg: number | null;
  widthCm: number | null;
  heightCm: number | null;
  lengthCm: number | null;
  currentOwner: string | null;
  assignedTo: string | null;
  responsibleFor: string | null;
  acquisitionDate: string | null;
  conditionId: number | null;
  initialValue: number | null;
  warrantyStartDate: string | null;
  warrantyEndDate: string | null;
  warrantyTerms: string | null;
  paymentTerms: string | null;
  depreciationStartDate: string | null;
  depreciationMethod: string | null;
  depreciationRate: number | null;
  vendorId: string | null;
  documents: (string | File)[];
  locationId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  aisleId: number | null;
  shelfId: number | null;
  currentOwnerName: string | null;
  responsibleForName: string | null;
  assignedToName: string | null;
  facilityName: string | null;
  buildingName: string | null;
  floorName: string | null;
  departmentName: string | null;
  roomName: string | null;
  aisleName: string | null;
  shelfName: string | null;
  categoryName: string | null;
  subCategoryName: string | null;
  conditionName: string | null;
  assetTypeId: number | null;
  statusId: number | null;
  assetTypeName: string | null;
  statusName: string | null;
  vendorDetails: {
    vendorName: string | null;
    address: string | null;
    phoneNumber: string | null;
    emailAddress: string | null;
  };
}

interface FilterInput {
  category: (string | number)[];
  location: (string | number)[];
}

interface LocationOption {
  label: string | null;
  value: number | null;
}

interface FormLocation {
  facility: LocationOption;
  building: LocationOption;
  floor: LocationOption;
  department: LocationOption;
  room: LocationOption;
  aisle: LocationOption;
  shelf: LocationOption;
}

interface AcquisitionInfo {
  rowId: number;
  assetId: number;
  assetName: string;
  assetCode: string;
  description: string;
  acquisitionDate: string;
  purchaseDate: string;
  initialValue: number;
  resalevalue: number;
  scrapvalue: number;
  vendorId: number;
  vendorName: string;
  vendorAddress: string | null;
  vendorContactNo: string;
  vendorContactEmail: string | null;
  warrantyDetails: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  depreciationMethod: string;
  depreciationDate: string;
  depreciationRate: number;
  accumulatedDepreciation: number;
  conditionName: string;
}

interface ContractDocument {
  rowId: number;
  assetId: number;
  contractId: number;
  contractDocument: string;
  documentId: number;
  documentName: string;
  documentType: string;
  vendorId: number;
  vendorName: string;
}

interface AssetImages {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  imageId: number;
  imageName: string;
  photoImage: string;
  isPrimaryImage: true;
  assetId: number;
}

export type {
  AssetLocation,
  Asset,
  AssetFormDetails,
  FilterInput,
  AssetStatusType,
  FormLocation,
  AcquisitionInfo,
  ContractDocument,
  AssetImages,
  AssetFormImages,
};
