export interface TableConfiguration {
    tableColumns: TableColumn[];
    actionIcons?: { edit?:boolean,isDelete?:boolean,more?:boolean};
}

export interface TableColumn {
    name: string;
    label: string;
    type?: string;
    headerAlign?: string;
    dataAlign?: string;
}