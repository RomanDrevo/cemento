export interface TableData {
    columns: Column[];
    data: RowData[];
}

export interface Column {
    id: string; // ID of the column. Should match the one on the data rows
    ordinalNo: number; // Position of the column
    title: string; // Name of the column
    type: "string" | "number" | "boolean" | "selection"; // Type of the data in the column
    width?: number; // Defines the width of the column
    options?: string[]; // Options for selection type column
}

export interface RowData {
    id: string;
    [columnId: string]: any;
}