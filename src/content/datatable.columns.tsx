import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import UnsubscribeCollaboratorAlertDialog from '@/pages/collaborators/unsubscribeCollaborator';
import { DeleteIcon } from '@chakra-ui/icons';
import { Unsubscribe } from '@material-ui/icons';
import { table } from 'console';
import { MUIDataTableColumn } from 'mui-datatables';

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