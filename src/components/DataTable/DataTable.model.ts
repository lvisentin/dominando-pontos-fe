import { ChangeEvent, ReactElement } from 'react';

export interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  actionButtons?: ReactElement[];
  handleEditClick?: (params?: any) => any;
  handleDeleteClick?: (params?: any) => any;
  handlePreviewClick?: (params?: any) => any;
  handleCheckboxClick?: (event: ChangeEvent<HTMLInputElement>, params?: any) => any;
  handleUnlinkClick?: (event: ChangeEvent<HTMLInputElement>, params?: any) => any;
  multiActions?: boolean;
  header?: ReactElement;
  footer?: ReactElement;
  actions?: RowAction[];
  limit?: number;
  page?: number;
  totalPages?: number;
  pagination?: boolean;
  setPage?: (page: number) => any;
  isNavigationDisabled?: boolean;
}

export interface RowAction {
  element: any;
  onClick: (params?: any) => any;
}

export interface TableColumn {
  field: string;
  name: string;
  transformData?: (data: any) => any;
}
