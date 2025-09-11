import { TableCall, TableStatus } from "../enums/table.enum";

export interface Table {
  _id: string;
  tableNumber: string;
  qrToken: string;
  tableStatus: TableStatus;
  tableCall: TableCall;
  activeIdentifier: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TableUpdateInput {
  _id: string;
  tableNumber?: string;
  qrToken?: string;
  tableStatus?: TableStatus;
  tableCall?: TableCall;
  activeIdentifier?: string | null;
}

