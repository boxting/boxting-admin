import { Box, Button, Grid } from '@chakra-ui/core';
import React, { Component } from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import DeleteCodeAlertDialog from './deleteCode';

/* const CodesList = (props) => {
    const { codes } = props;
    const router = useRouter();

    if (codes == null || codes.data.length == 0)
        return <p>No se han registrado códigos de acceso.</p>;

    return (
        <Box>
            <Grid
                py={2}
                templateColumns="repeat(3, 100px)"
                gap={4}
            >
                <Box>
                    {"Código"}
                </Box>
                <Box>
                    {"Usado"}
                </Box>
                <Box>
                    {"Acciones"}
                </Box>
            </Grid>

            {codes.data.map((item) => (
                <Grid
                    py={2}
                    templateColumns="repeat(3, 100px)"
                    gap={4}
                    key={item.id}
                >
                    <Box>
                        {item.code}
                    </Box>
                    <Box>
                        {(item.used) ? "Si" : "No"}
                    </Box>
                    <Box>
                        <Button colorScheme="blue" onClick={() => { c}}>
                            Modificar
                        </Button>
                        <DeleteCodeAlertDialog code={item} codes={codes.data}/>
                    </Box>
                </Grid>
            ))
            }
        </Box>
    );
};

export default CodesList;
 */

class CodesList extends React.Component<{codes: object}, { codeList: [] }>{
        
    constructor(props){
        super(props)

        this.deleteCode = this.deleteCode.bind(this)

        this.state = {
            codeList : []
        }
    }

    componentDidMount(){
        if(this.props.codes != null){
            this.setState({
                codeList: this.props.codes.data
            })
        } 
    }

    async deleteCode(item) {
        let list = this.state.codeList.filter((val) => val != item) as []

        this.setState({
            codeList: list
        })
    }

    render(){

        if (this.state.codeList == null || this.state.codeList.length == 0)
            return <p>No se han registrado códigos de acceso.</p>;
        
        return (
            <Box>
                <Grid
                    py={2}
                    templateColumns="repeat(3, 100px)"
                    gap={4}
                >
                    <Box>
                        {"Código"}
                    </Box>
                    <Box>
                        {"Usado"}
                    </Box>
                    <Box>
                        {"Acciones"}
                    </Box>
                </Grid>
    
                {this.state.codeList.map((item) => (
                    <Grid
                        py={2}
                        templateColumns="repeat(3, 100px)"
                        gap={4}
                        key={item.id}
                    >
                        <Box>
                            {item.code}
                        </Box>
                        <Box>
                            {(item.used) ? "Si" : "No"}
                        </Box>
                        <Box>
                            <Button colorScheme="blue" onClick={() => {}}>
                                Modificar
                            </Button>
                            <DeleteCodeAlertDialog code={item} onDelete={this.deleteCode}/>
                        </Box>
                    </Grid>
                ))
                }
            </Box>
        );
    }
}

export default CodesList;
