import { Box, Button, Grid } from '@chakra-ui/core';
import { Component } from 'react';
import DeleteCodeAlertDialog from './deleteCode';
import UpdateCodeModal from './updateCode';
import CreateCodeModal from './createCode';

class CodesList extends Component<{codes: object, eventId: string}, { codeList: Object[] }>{
        
    constructor(props){
        super(props)

        this.deleteCode = this.deleteCode.bind(this)
        this.updateCode = this.updateCode.bind(this)
        this.addCodes = this.addCodes.bind(this)

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

    deleteCode(index) {
        let list = this.state.codeList
        delete list[index]

        this.setState({
            codeList: list
        })
    }

    updateCode(item, index) {
        let list = this.state.codeList

        list[index] = item

        this.setState({
            codeList: list
        })
    }

    addCodes(codes: Object[]){
        let list = this.state.codeList
        list = list.concat(codes)
        
        this.setState({
            codeList: list
        })
    }

    render(){

        if (this.state.codeList == null || this.state.codeList.length == 0){
            return (
                <Box>
                    <CreateCodeModal eventId={this.props.eventId} onAddCodes={this.addCodes}/>
                    <p>No se han registrado códigos de acceso.</p>
                </Box>
            )
        }
        
        return (
            <Box>
                <CreateCodeModal eventId={this.props.eventId} onAddCodes={this.addCodes}/>
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
    
                {this.state.codeList.map((item, index) => (
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
                            <UpdateCodeModal code={item} index={index} onUpdate={this.updateCode}/>
                            <DeleteCodeAlertDialog code={item} index={index} onDelete={this.deleteCode}/>
                        </Box>
                    </Grid>
                ))
                }
            </Box>
        );
    }
}

export default CodesList;
