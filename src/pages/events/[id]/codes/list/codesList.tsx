import { Box, Heading, Text } from '@chakra-ui/core';
import React, { Component } from 'react';
import DeleteCodeAlertDialog from '../deleteCode';
import UpdateCodeModal from '../updateCode';
import CreateCodeModal from '../createCode';
import { AccessCode } from '@/data/access_code/model/access.code.model';

interface CodeListProps {
    codes: AccessCode[],
    eventId: string
}

interface CodeListState {
    codeList: AccessCode[]
}

// Needs to be a React Component because screen updates on create/delete/update
class CodesList extends Component<CodeListProps, CodeListState>{

    constructor(props: CodeListProps) {
        super(props)

        this.deleteCode = this.deleteCode.bind(this)
        this.updateCode = this.updateCode.bind(this)
        this.addCodes = this.addCodes.bind(this)

        this.state = {
            codeList: []
        }
    }

    componentDidMount() {
        if (this.props.codes != null) {
            this.setState({
                codeList: this.props.codes
            })
        }
    }

    deleteCode = (index: number) => {
        let list = this.state.codeList
        delete list[index]

        this.setState({
            codeList: list
        })
    }

    updateCode = (item: AccessCode, index: number) => {
        let list = this.state.codeList
        list[index] = item

        this.setState({
            codeList: list
        })
    }

    addCodes = (newCodes: AccessCode[]) => {
        let list = this.state.codeList
        list = list.concat(newCodes)

        this.setState({
            codeList: list
        })
    }

    render() {

        if (this.state.codeList == null || this.state.codeList.length == 0) {
            return (
                <Box>
                    <CreateCodeModal eventId={this.props.eventId} onAddCodes={this.addCodes} />
                    <p>No se han registrado códigos de acceso.</p>
                </Box>
            )
        }

        return (
            <Box>
                <CreateCodeModal eventId={this.props.eventId} onAddCodes={this.addCodes} />
                {
                    this.state.codeList.map((item, index) => (

                        <Box key={item.id} marginY={4} padding={4} borderWidth='1px' borderRadius='lg'>
                            <Box marginBottom={2}>
                                <Heading as='h5' size='sm'>Código</Heading>
                                <Text>{item.code}</Text>
                            </Box>
                            <Text marginBottom={2}>Usado: {(item.used) ? "Si" : "No"}</Text>
                            <Box>
                                <UpdateCodeModal code={item} index={index} onUpdate={this.updateCode} />
                                <DeleteCodeAlertDialog code={item} index={index} onDelete={this.deleteCode} />
                            </Box>
                        </Box>

                    ))
                }
            </Box>
        );
    }
}

export default CodesList;