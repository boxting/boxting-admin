import { MUIDataTableOptions, MUIDataTableProps } from "mui-datatables";

export const CollaboratorsTableOptions: MUIDataTableOptions = {
    enableNestedDataAccess: '.',
    filter: "false",
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    downloadOptions: {
        filterOptions: {
            useDisplayedColumnsOnly: false,
            useDisplayedRowsOnly: false,
        }
    },
    textLabels: {
        toolbar: {
            downloadCsv: 'Descargar CSV',
            filterTable: 'Filtrar',
            print: 'Imprimir página actual',
            search: 'Buscar',
            viewColumns: 'Seleccionar columnas'
        },
        pagination: {
            rowsPerPage: "Filas por página"
        },
        body: {
            noMatch: 'No se encontraron resultados.'
        }
    }
}

export const VotersTableOptions: MUIDataTableOptions = {
    enableNestedDataAccess: '.',
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    downloadOptions: {
        filterOptions: {
            useDisplayedColumnsOnly: false,
            useDisplayedRowsOnly: false,
        }
    },
    textLabels: {
        toolbar: {
            downloadCsv: 'Descargar CSV',
            filterTable: 'Filtrar',
            print: 'Imprimir página actual',
            search: 'Buscar',
            viewColumns: 'Seleccionar columnas'
        },
        pagination: {
            rowsPerPage: "Filas por página"
        },
        body: {
            noMatch: 'No se encontraron resultados.'
        }
    }
}

export const CodesTableOptions: MUIDataTableOptions = {
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    filter: "false",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    downloadOptions: {
        filterOptions: {
            useDisplayedColumnsOnly: false,
            useDisplayedRowsOnly: false,
        }
    },
    textLabels: {
        toolbar: {
            downloadCsv: 'Descargar CSV',
            filterTable: 'Filtrar',
            print: 'Imprimir página actual',
            search: 'Buscar',
        },
        pagination: {
            rowsPerPage: "Filas por página"
        },
        body: {
            noMatch: 'No se encontraron resultados.'
        }
    }
}