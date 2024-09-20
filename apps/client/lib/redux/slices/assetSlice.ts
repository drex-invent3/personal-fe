import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Asset,
  AssetFormDetails,
  AssetImages,
  AssetStatusType,
} from '~/lib/interfaces/asset.interfaces';

const initialValue = {
  rowId: 0,
  guid: '',
  primaryImage: null,
  assetId: null,
  assetName: '',
  brandName: null,
  modelRef: null,
  assetCode: '',
  assetTag: '',
  rfidtag: '',
  serialNo: '',
  lifeExpectancy: 0,
  acquisitionDate: '',
  currentOwner: '',
  assignedTo: '',
  responsibleFor: '',
  purchaseDate: '',
  initialValue: 0,
  resalevalue: 0,
  dateCreated: '',
  scrapvalue: 0,
  parentId: null,
  isDeleted: false,
  assetType: '',
  currentStatus: 'Inactive' as AssetStatusType,
  assetCategory: '',
  assetSubCategory: '',
  currentCondition: '',
  weightKg: 0,
  lengthCm: 0,
  widthCm: 0,
  heightCm: 0,
  facilityName: '',
  facilityRef: '',
  facilityAddress: '',
  facilityLongitude: 0,
  facilityLatitude: 0,
  buildingName: '',
  buildingRef: '',
  buildingAddress: '',
  buildingLongitude: 0,
  buildingLatitude: 0,
  floorName: '',
  floorRef: '',
  departmentName: '',
  departmentRef: '',
  roomName: '',
  roomRef: '',
  aisleName: '',
  aisleRef: '',
  shelfName: '',
  shelfRef: '',
  description: '',
  assetComponentId: 0,
  lastMaintenanceDate: null,
  nextMaintenanceDate: null,
  currentCost: 0,
  maintenanceCost: 0,
  y2dmaintenanceCost: 0,
};

const initialAssetForm = {
  images: [],
  assetId: null,
  assetName: '',
  description: '',
  assetCode: '',
  brandName: '',
  modelRef: '',
  serialNo: '',
  codePrefix: '',
  codeSuffix: '',
  categoryId: '',
  subCategoryId: '',
  weightKg: undefined,
  widthCm: undefined,
  heightCm: undefined,
  lengthCm: undefined,
  currentOwner: '',
  department: '',
  assignedTo: '',
  responsibleFor: '',
  acquisitionDate: '',
  conditionId: '',
  initialValue: undefined,
  warrantyStartDate: '',
  warrantyEndDate: '',
  warrantyTerms: '',
  paymentTerms: '',
  depreciationStartDate: '',
  depreciationMethod: '',
  depreciationRate: undefined,
  vendorId: '',
  documents: [],
  facilityId: undefined,
  buildingId: undefined,
  floorId: undefined,
  departmentId: undefined,
  roomId: undefined,
  aisleId: undefined,
  shelfId: undefined,
  currentOwnerName: undefined,
  responsibleForName: undefined,
  assignedToName: undefined,
  facilityName: undefined,
  buildingName: undefined,
  floorName: undefined,
  departmentName: undefined,
  roomName: undefined,
  aisleName: undefined,
  shelfName: undefined,
  categoryName: undefined,
  subCategoryName: undefined,
  conditionName: undefined,
  vendorDetails: {
    vendorName: undefined,
    address: undefined,
    phoneNumber: undefined,
    emailAddress: undefined,
  },
};

export interface SliceProps {
  asset: Asset;
  assetForm: AssetFormDetails;
  assetImages: AssetImages[];
}

const initialState: SliceProps = {
  asset: initialValue,
  assetForm: initialAssetForm,
  assetImages: [],
};

export const assetSlice = createSlice({
  name: 'assetReducer',
  initialState,
  reducers: {
    setAsset: (state, { payload }: PayloadAction<Asset>) => {
      state.asset = payload;
    },
    clearAsset: (state) => {
      state.asset = initialValue;
    },
    setAssetImages: (state, { payload }: PayloadAction<AssetImages[]>) => {
      state.assetImages = payload;
    },
    clearAssetImages: (state) => {
      state.asset = initialValue;
    },
    setAssetForm: (state, { payload }: PayloadAction<AssetFormDetails>) => {
      state.assetForm = payload;
    },
    updateAssetForm: (
      state,
      { payload }: PayloadAction<Partial<AssetFormDetails>>
    ) => {
      state.assetForm = { ...state.assetForm, ...payload };
    },
    clearAssetForm: (state) => {
      state.assetForm = initialAssetForm;
    },
  },
});

export const {
  setAsset,
  clearAsset,
  setAssetForm,
  clearAssetForm,
  updateAssetForm,
} = assetSlice.actions;

export default assetSlice.reducer;
