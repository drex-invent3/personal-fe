import {
  AnalyticsIcon,
  AssetManagementIcon,
  ComplianceIcon,
  DashboardIcon,
  MaintenanceIcon,
  TaskIcon,
  TicketIcon,
} from '~/lib/components/CustomIcons/layout';

const sideBarData = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Asset Management',
    route: 'asset-management',
    icon: AssetManagementIcon,
  },
  {
    name: 'Task Management',
    route: 'task-management',
    icon: TaskIcon,
  },
  {
    name: 'Maintenance Schedule',
    route: 'maintenance',
    icon: MaintenanceIcon,
  },
  {
    name: 'Tickets',
    route: 'tickets',
    icon: TicketIcon,
  },
  {
    name: 'Report & Analytics',
    route: 'report-analytics',
    icon: AnalyticsIcon,
  },
  {
    name: 'Compliance',
    route: 'compliance',
    icon: ComplianceIcon,
  },
];

export default sideBarData;
