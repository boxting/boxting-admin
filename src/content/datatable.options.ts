import { MUIDataTableOptions } from "mui-datatables";

export const CollaboratorsTableOptions: MUIDataTableOptions = {
    enableNestedDataAccess: '.',
    filter: "false",
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20]
}

export const VotersTableOptions: MUIDataTableOptions = {
    enableNestedDataAccess: '.',
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20]
}