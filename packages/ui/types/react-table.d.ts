/* eslint-disable no-unused-vars */
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    isNumeric?: boolean;
    centerHeader?: boolean;
  }
}
