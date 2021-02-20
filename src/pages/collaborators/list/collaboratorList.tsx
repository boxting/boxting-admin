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

interface CollaboratorListProps {
    events: Event[],
    default: string | undefined,
    router: NextRouter
}

interface CollaboratorListState {
    collaborators: User[],
    events: Event[],
    currentEvent: string | undefined
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
            currentEvent: undefined
        }
    }

    async getCollaborators(eventId: string) {
        try {
            const res = await this.userRepository.getAll(eventId, 'collaborators')
            const collaborators = UserMapper.getAllToUserList(res)
            return collaborators
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async componentDidMount() {
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
                currentEvent: propCurrentEvent
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onSelectEvent = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        let selectedEvent = event.target.value
        let currentCollaborators = await this.getCollaborators(selectedEvent)

        this.setState({
            currentEvent: selectedEvent,
            collaborators: currentCollaborators
        })
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
        console.log(index)

        if (index != undefined) {
            const list = this.state.collaborators
            list.splice(index, 1)
            console.log(list)
            console.log(list.length)
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
                    />

                    <AddExistingCollaboratorModal
                        eventId={this.state.currentEvent}
                        onAddCollaborator={this.onAddCollaborator}
                    />
                </Flex>

                {
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
