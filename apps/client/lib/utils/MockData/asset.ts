import { Asset } from '~/lib/interfaces/asset.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';

const assetData: Asset[] = [
  {
    rowId: 1,
    assetId: 7,
    assetName: 'Laptop',
    brandName: 'Dell',
    modelRef: 'Latitude5550',
    assetCode: 'LPT001',
    assetTag: 'TAG001',
    rfidtag: 'RFID1',
    serialNo: 'SN001',
    lifeExpectancy: 5,
    acquisitionDate: '2023-01-15T00:00:00',
    currentOwner: 'John Doe',
    assignedTo: 'John Doe',
    responsibleFor: 'John Doe',
    purchaseDate: '2023-01-15T00:00:00',
    initialValue: 1000000.0,
    resalevalue: 800000.0,
    dateCreated: '2024-06-25T14:58:28.43',
    scrapvalue: 65000.0,
    parentId: null,
    isDeleted: false,
    assetType: 'Air Conditioner',
    currentStatus: 'Under Maintenance',
    assetCategory: 'Fire and Safety Systems',
    assetSubCategory: 'Fire Alarm Systems',
    currentCondition: 'Excellent',
    weightKg: 200.0,
    lengthCm: 45.0,
    widthCm: 30.0,
    heightCm: 4.0,
    facilityName: 'Research Lab',
    facilityRef: 'RL-003',
    facilityAddress: '789 Research Blvd, Science City, SC 34567',
    facilityLongitude: -126.0,
    facilityLatitude: 50.0,
    buildingName: 'Building 31',
    buildingRef: 'B031',
    buildingAddress: '131 Main St, Cityville, CV 12345',
    buildingLongitude: -123.0,
    buildingLatitude: 48.0,
    floorName: 'Floor 1',
    floorRef: 'F001',
    departmentName: 'Security',
    departmentRef: 'SEC001',
    roomName: 'Room 105',
    roomRef: 'R105',
    aisleName: 'Aisle 7',
    aisleRef: 'A107',
    shelfName: 'Shelf 14',
    shelfRef: 'S114',
    description: 'Dell Laptop',
    assetComponentId: null,
    lastMaintenanceDate: null,
    nextMaintenanceDate: null,
    currentCost: 1000000.0,
    maintenanceCost: 0.0,
  },
  {
    rowId: 2,
    assetId: 8,
    assetName: 'Printer',
    brandName: null,
    modelRef: null,
    assetCode: 'PRT001',
    assetTag: 'TAG002',
    rfidtag: null,
    serialNo: 'SN002',
    lifeExpectancy: 7,
    acquisitionDate: '2022-12-20T00:00:00',
    currentOwner: 'Jane Smith',
    assignedTo: null,
    responsibleFor: null,
    purchaseDate: '2022-12-20T00:00:00',
    initialValue: null,
    resalevalue: 500.0,
    dateCreated: '2024-06-25T14:58:28.43',
    scrapvalue: 50.0,
    parentId: null,
    isDeleted: false,
    assetType: 'Refrigerator',
    currentStatus: 'Active',
    assetCategory: 'Furniture and Fixtures',
    assetSubCategory: 'Built-in Fixtures',
    currentCondition: 'Good',
    weightKg: null,
    lengthCm: null,
    widthCm: null,
    heightCm: null,
    facilityName: 'Head Office',
    facilityRef: 'HO-001',
    facilityAddress: '123 Main St, Cityville, CV 12345',
    facilityLongitude: -123.0,
    facilityLatitude: 48.0,
    buildingName: 'Building 10',
    buildingRef: 'B010',
    buildingAddress: '510 Remote Ln, Smalltown, ST 56789',
    buildingLongitude: -128.0,
    buildingLatitude: 53.0,
    floorName: 'Floor 13',
    floorRef: 'F013',
    departmentName: 'Sales',
    departmentRef: 'SAL001',
    roomName: 'Room 105',
    roomRef: 'R105',
    aisleName: 'Aisle 1',
    aisleRef: 'A101',
    shelfName: 'Shelf 19',
    shelfRef: 'S119',
    description: 'HP Printer',
    assetComponentId: null,
    lastMaintenanceDate: null,
    nextMaintenanceDate: null,
    currentCost: 0.0,
    maintenanceCost: 0.0,
  },
  {
    rowId: 3,
    assetId: 11,
    assetName: 'Desktop Computer',
    brandName: null,
    modelRef: null,
    assetCode: 'DTC001',
    assetTag: 'TAG003',
    rfidtag: null,
    serialNo: 'SN003',
    lifeExpectancy: 6,
    acquisitionDate: '2023-02-01T00:00:00',
    currentOwner: 'Michael Brown',
    assignedTo: null,
    responsibleFor: null,
    purchaseDate: '2023-02-01T00:00:00',
    initialValue: null,
    resalevalue: 700.0,
    dateCreated: '2024-06-25T14:58:28.43',
    scrapvalue: 50.0,
    parentId: null,
    isDeleted: false,
    assetType: 'Power Leads',
    currentStatus: 'Non-Operational',
    assetCategory: 'Mechanical Systems',
    assetSubCategory: 'Water Heaters',
    currentCondition: 'Fair',
    weightKg: null,
    lengthCm: null,
    widthCm: null,
    heightCm: null,
    facilityName: 'Research Lab',
    facilityRef: 'RL-003',
    facilityAddress: '789 Research Blvd, Science City, SC 34567',
    facilityLongitude: -126.0,
    facilityLatitude: 50.0,
    buildingName: 'Building 26',
    buildingRef: 'B026',
    buildingAddress: '126 Main St, Cityville, CV 12345',
    buildingLongitude: -123.0,
    buildingLatitude: 48.0,
    floorName: 'Floor 2',
    floorRef: 'F002',
    departmentName: 'Legal',
    departmentRef: 'LGL001',
    roomName: 'Room 112',
    roomRef: 'R112',
    aisleName: 'Aisle 3',
    aisleRef: 'A103',
    shelfName: 'Shelf 9',
    shelfRef: 'S109',
    description: 'Lenovo Desktop',
    assetComponentId: null,
    lastMaintenanceDate: null,
    nextMaintenanceDate: null,
    currentCost: 0.0,
    maintenanceCost: 0.0,
  },
  {
    rowId: 4,
    assetId: 13,
    assetName: 'Projector',
    brandName: null,
    modelRef: null,
    assetCode: 'PRJ001',
    assetTag: 'TAG004',
    rfidtag: null,
    serialNo: 'SN004',
    lifeExpectancy: 8,
    acquisitionDate: '2023-03-10T00:00:00',
    currentOwner: 'Sarah Johnson',
    assignedTo: null,
    responsibleFor: null,
    purchaseDate: '2023-03-10T00:00:00',
    initialValue: null,
    resalevalue: 1200.0,
    dateCreated: '2024-06-25T14:58:28.43',
    scrapvalue: 200.0,
    parentId: null,
    isDeleted: false,
    assetType: 'Power Generator',
    currentStatus: 'Scheduled for Maintenance',
    assetCategory: 'Security Systems',
    assetSubCategory: 'Intrusion Detection Systems',
    currentCondition: 'Poor',
    weightKg: null,
    lengthCm: null,
    widthCm: null,
    heightCm: null,
    facilityName: 'Research Lab',
    facilityRef: 'RL-003',
    facilityAddress: '789 Research Blvd, Science City, SC 34567',
    facilityLongitude: -126.0,
    facilityLatitude: 50.0,
    buildingName: 'Building 25',
    buildingRef: 'B025',
    buildingAddress: '525 Remote Ln, Smalltown, ST 56789',
    buildingLongitude: -128.0,
    buildingLatitude: 53.0,
    floorName: 'Floor 6',
    floorRef: 'F006',
    departmentName: 'Human Resources',
    departmentRef: 'HR001',
    roomName: 'Room 106',
    roomRef: 'R106',
    aisleName: 'Aisle 9',
    aisleRef: 'A109',
    shelfName: 'Shelf 2',
    shelfRef: 'S102',
    description: 'Epson Projector',
    assetComponentId: null,
    lastMaintenanceDate: null,
    nextMaintenanceDate: null,
    currentCost: 0.0,
    maintenanceCost: 0.0,
  },
  {
    rowId: 5,
    assetId: 16,
    assetName: 'Mobile Phone',
    brandName: null,
    modelRef: null,
    assetCode: 'MPH001',
    assetTag: 'TAG005',
    rfidtag: null,
    serialNo: 'SN005',
    lifeExpectancy: 4,
    acquisitionDate: '2023-04-05T00:00:00',
    currentOwner: 'David Wilson',
    assignedTo: null,
    responsibleFor: null,
    purchaseDate: '2023-04-05T00:00:00',
    initialValue: null,
    resalevalue: 600.0,
    dateCreated: '2024-06-25T14:58:28.43',
    scrapvalue: 80.0,
    parentId: null,
    isDeleted: false,
    assetType: 'Refrigerator',
    currentStatus: 'Inactive',
    assetCategory: 'Specialized Equipment',
    assetSubCategory: 'Medical Equipment (for hospitals)',
    currentCondition: 'Very Poor',
    weightKg: null,
    lengthCm: null,
    widthCm: null,
    heightCm: null,
    facilityName: 'Manufacturing Plant',
    facilityRef: 'MP-004',
    facilityAddress: '101 Plant Ave, Factory Town, FT 45678',
    facilityLongitude: -127.0,
    facilityLatitude: 51.0,
    buildingName: 'Building 50',
    buildingRef: 'B050',
    buildingAddress: '550 Remote Ln, Smalltown, ST 56789',
    buildingLongitude: -128.0,
    buildingLatitude: 53.0,
    floorName: 'Floor 15',
    floorRef: 'F015',
    departmentName: 'IT Services',
    departmentRef: 'IT001',
    roomName: 'Room 105',
    roomRef: 'R105',
    aisleName: 'Aisle 4',
    aisleRef: 'A104',
    shelfName: 'Shelf 20',
    shelfRef: 'S120',
    description: 'Samsung Phone',
    assetComponentId: null,
    lastMaintenanceDate: null,
    nextMaintenanceDate: null,
    currentCost: 0.0,
    maintenanceCost: 0.0,
  },
];

const categoryData: Option[] = [
  {
    value: 'IT Equipment',
    label: 'IT Equipment',
  },
  {
    value: 'Vehicle',
    label: 'Vehicle',
  },
  {
    value: 'Machinery',
    label: 'Machinery',
  },
  {
    value: 'Heavy Equipment',
    label: 'Heavy Equipment',
  },
  {
    value: 'Outdoor Equipment',
    label: 'Outdoor Equipment',
  },
];

export { assetData, categoryData };
