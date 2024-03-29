import { Box, Flex, Grid, Select } from '@chakra-ui/core';
import React, { Component } from 'react';
import Card from '@/components/card';
import { Event } from '@/data/event/model/event.model';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { NextRouter } from 'next/router';
import { UserRepository } from '@/data/user/repository/users.repository';
import { User } from '@/data/user/model/user.model';
import CreateCollaboratorModal from '../createCollaborator';
import AddExistingCollaboratorModal from '../addExistingCollaborator';
import MUIDataTable from 'mui-datatables';
import { CollaboratorsTableOptions } from '@/content/datatable.options';
import { CollaboratorsTableColumns } from '@/content/datatable.columns';
import { CircularProgress } from '@material-ui/core';

interface CollaboratorListProps {
    events: Event[],
    default: string | undefined,
    router: NextRouter
}

interface CollaboratorListState {
    collaborators: User[],
    events: Event[],
    currentEvent: string | undefined
    error: boolean
    loading: boolean
}

// Needs to be a React Component because screen updates on create/delete/update
class CollaboratorList extends Component<CollaboratorListProps, CollaboratorListState> {

    userRepository: UserRepository
    router: NextRouter
    _isMounted = false;

    constructor(props: CollaboratorListProps) {
        super(props)

        this.userRepository = UserRepository.getInstance()
        this.router = this.props.router

        this.onSelectEvent = this.onSelectEvent.bind(this)
        this.onAddCollaborator = this.onAddCollaborator.bind(this)
        this.onUnsubscribeCollaborator = this.onUnsubscribeCollaborator.bind(this)

        this.state = {
            collaborators: [],
            events: [],
            currentEvent: undefined,
            error: false,
            loading: false
        }
    }

    async getCollaborators(eventId: string): Promise<User[]> {
        try {
            const res = await this.userRepository.getAll(eventId, 'collaborators')
            const collaborators = UserMapper.getAllToUserList(res)
            return Promise.resolve(collaborators)
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })

        try {
            this._isMounted = true
            let propEvents = this.props.events
            let propCurrentEvent = this.props.default
            let currentCollaborators = []

            if (propCurrentEvent != undefined && propEvents.length != 0) {
                currentCollaborators = await this.getCollaborators(propCurrentEvent)
            } else if (propEvents.length != 0) {
                currentCollaborators = await this.getCollaborators(propEvents[0].id.toString())
                propCurrentEvent = propEvents[0].id.toString()
            }

            if (this._isMounted) {
                this.setState({
                    collaborators: currentCollaborators,
                    events: propEvents,
                    currentEvent: propCurrentEvent,
                    error: false,
                    loading: false
                })
            }
        } catch (error) {
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onSelectEvent = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        this.setState({ loading: true })

        try {
            let selectedEvent = event.target.value
            let currentCollaborators = []

            if (selectedEvent == undefined || selectedEvent == '') {
                selectedEvent = undefined
            } else {
                currentCollaborators = await this.getCollaborators(selectedEvent)
            }

            this.setState({
                currentEvent: selectedEvent,
                collaborators: currentCollaborators,
                error: false,
                loading: false
            })
        } catch (error) {
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    onAddCollaborator = (collaborator: User) => {
        if (collaborator != undefined) {
            const list = this.state.collaborators
            list.push(collaborator)
            this.setState({
                collaborators: list
            })
        }
    }

    onUnsubscribeCollaborator = (index: number) => {
        if (index != undefined) {
            const list = this.state.collaborators
            list.splice(index, 1)
            this.setState({
                collaborators: list
            })
        }
    }

    render() {

        // Get table colums configuration
        const tableColumns = CollaboratorsTableColumns({
            eventId: this.state.currentEvent,
            onUnsubscribeCollaborator: this.onUnsubscribeCollaborator
        })

        return (
            <Box>
                <Flex pb={4}>
                    <Select
                        placeholder="Selecciona un evento de votación"
                        value={this.state.currentEvent}
                        onChange={this.onSelectEvent}
                    >
                        {this.state.events.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Select>
                </Flex>


                <Flex pb={4}>

                    <CreateCollaboratorModal
                        eventId={this.state.currentEvent}
                        onAddCollaborator={this.onAddCollaborator}
                        disabled={this.state.currentEvent == undefined}
                    />

                    <AddExistingCollaboratorModal
                        eventId={this.state.currentEvent}
                        onAddCollaborator={this.onAddCollaborator}
                        disabled={this.state.currentEvent == undefined}
                    />
                </Flex>

                {
                    (this.state.loading) ? <CircularProgress /> :
                        (this.state.error) ? <p>Ocurrió un error al cargar los colaboradores del evento.</p> :
                            (this.state.currentEvent == undefined) ? <p>Debes seleccionar un evento del listado.</p> :
                                (this.state.collaborators.length == 0) ? <p>No se han agregado colaboradores para el evento.</p> :
                                    <MUIDataTable
                                        columns={tableColumns}
                                        data={this.state.collaborators}
                                        title={'Listado de colaboradores'}
                                        options={CollaboratorsTableOptions}
                                    />
                }
            </Box>

        );
    }
};

export default CollaboratorList;
