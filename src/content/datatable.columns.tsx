import { AccessCode } from '@/data/access_code/model/access.code.model';
import UnsubscribeCollaboratorAlertDialog from '@/pages/collaborators/unsubscribeCollaborator';
import DeleteCodeAlertDialog from '@/pages/events/[eventId]/codes/deleteCode';
import UpdateCodeModal from '@/pages/events/[eventId]/codes/updateCode';
import { MUIDataTableColumn } from 'mui-datatables';

/** Columns configuration for collaborators datatable **/

interface CollaboratorsTableColumnsParams {
    eventId: string,
    onUnsubscribeCollaborator: (index: number) => void
}

export const CollaboratorsTableColumns = (params: CollaboratorsTableColumnsParams): MUIDataTableColumn[] => {
    return [
        {
            name: 'id',
            label: 'Id',
            options: {
                display: 'excluded'
            }
        },
        {
            name: 'organizer.name',
            label: 'Nombre'
        },
        {
            name: 'username',
            label: 'Nombre de usuario'
        },
        {
            name: 'mail',
            label: 'Correo'
        },
        {
            name: "Eliminar",
            options: {
                print: false,
                download: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <UnsubscribeCollaboratorAlertDialog
                            eventId={params.eventId}
                            userId={tableMeta.rowData[0]}
                            username={tableMeta.rowData[2]}
                            onUnsubscribeCollaborator={() => { params.onUnsubscribeCollaborator(tableMeta.rowIndex) }}
                        />
                    );
                }
            }
        }
    ];
}

/** Columns configuration for voters datatable **/

export const VotersTableColumns = (): MUIDataTableColumn[] => {
    return [
        {
            name: 'id',
            label: 'Id',
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: 'voter.firstName',
            label: 'Nombre',
            options: {
                filter: false
            }
        },
        {
            name: 'voter.lastName',
            label: 'Apellidos',
            options: {
                filter: false
            }
        },
        {
            name: 'username',
            label: 'Nombre de usuario',
            options: {
                filter: false
            }
        },
        {
            name: 'voter.dni',
            label: 'DNI',
            options: {
                filter: false
            }
        },
        {
            name: 'voter.phone',
            label: 'Teléfono',
            options: {
                filter: false
            }
        },
        {
            name: 'voter.age',
            label: 'Edad',
            options: {
                filter: true
            }
        },
        {
            name: 'mail',
            label: 'Correo',
            options: {
                filter: false
            }
        }
    ];
}


/** Columns configuration for codes datatable **/

interface CodesTableColumnsParams {
    onUpdate: (item: AccessCode, index: number) => void,
    onDelete: (index: number) => void
}

export const CodesTableColumns = (params: CodesTableColumnsParams): MUIDataTableColumn[] => {
    return [
        {
            name: 'id',
            label: 'Id',
            options: {
                display: 'excluded'
            }
        },
        {
            name: 'eventId',
            label: 'Id de evento',
            options: {
                display: 'excluded'
            }
        },
        {
            name: 'code',
            label: 'Código'
        },
        {
            name: 'used',
            label: 'Estado',
            options: {
                customBodyRender: (value) => {
                    return (value) ? 'Usado' : 'Sin usar'
                }
            }
        },
        {
            name: "Acciones",
            options: {
                print: false,
                download: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    let data = tableMeta.rowData
                    let currentCode: AccessCode = {
                        id: data[0],
                        eventId: data[1],
                        code: data[2],
                        used: data[3]
                    }
                    return (
                        <>
                            <UpdateCodeModal
                                code={currentCode}
                                onUpdate={() => { params.onUpdate(currentCode, tableMeta.rowIndex) }}
                            />
                            <DeleteCodeAlertDialog
                                code={currentCode}
                                onDelete={() => { params.onDelete(tableMeta.rowIndex) }}
                            />
                        </>
                    );
                }
            }
        }
    ];
}