import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { DeleteIcon } from '@chakra-ui/icons';
import { MUIDataTableColumn } from 'mui-datatables';

export const CollaboratorsTableColumns: MUIDataTableColumn[] = [
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
                    <BoxtingButton
                        style={{margin:'0px'}}
                        text="Eliminar"
                        typeBtn={ButtonType.outline}
                        leftIcon={<DeleteIcon boxSize={4} />}
                        onEnter={() => {console.log(tableMeta.rowData[0])}}
                    />
                );
            }
        }
    }
];