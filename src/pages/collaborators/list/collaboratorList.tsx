import { Box, Flex, Grid, Select } from '@chakra-ui/core';
import React, { Component } from 'react';
import Card from '@/components/card';
import { Event } from '@/data/event/model/event.model';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { AddSmallIcon } from '@/components/icons';
import { NextRouter } from 'next/router';
import { UserRepository } from '@/data/user/repository/users.repository';
import { User } from '@/data/user/model/user.model';


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

    constructor(props: CollaboratorListProps) {
        super(props)

        this.userRepository = UserRepository.getInstance()
        this.router = this.props.router

        this.onSelectEvent = this.onSelectEvent.bind(this)
        this.onCreateCollaborator = this.onCreateCollaborator.bind(this)

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

        let propEvents = this.props.events
        let propCurrentEvent = this.props.default
        let currentCollaborators = []

        if (propCurrentEvent != undefined && propEvents.length != 0) {
            currentCollaborators = await this.getCollaborators(propCurrentEvent)
        } else if (propEvents.length != 0) {
            currentCollaborators = await this.getCollaborators(propEvents[0].id.toString())
            propCurrentEvent = propEvents[0].id.toString()
        }

        this.setState({
            collaborators: currentCollaborators,
            events: propEvents,
            currentEvent: propCurrentEvent
        })
    }

    onSelectEvent = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        let selectedEvent = event.target.value
        let currentCollaborators = await this.getCollaborators(selectedEvent)

        this.setState({
            currentEvent: selectedEvent,
            collaborators: currentCollaborators
        })
    }

    onCreateCollaborator = () => {
        if (this.state.currentEvent != undefined && this.state.currentEvent != '') {
            this.router.push(
                `/events/[eventId]/elections/create/`,
                `/events/${this.state.currentEvent}/elections/create/`
            )
        } else {
            console.log('No event selected')
        }
    }

    render() {
        return (
            <Box>
                <Flex pb={4}>
                    <Select placeholder="Selecciona un evento de votación" value={this.state.currentEvent} onChange={this.onSelectEvent}>
                        {this.state.events.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Select>
                </Flex>


                <Flex pb={4}>
                    <BoxtingButton
                        style={{ marginRight: '12px', marginBottom: '12px' }}
                        text="Crear nuevo"
                        typeBtn={ButtonType.primary}
                        leftIcon={<AddSmallIcon boxSize={4} />}
                        onEnter={this.onCreateCollaborator}
                    />

                    <BoxtingButton
                        style={{ marginRight: '12px', marginBottom: '12px' }}
                        text="Agregar existente"
                        typeBtn={ButtonType.primary}
                        leftIcon={<AddSmallIcon boxSize={4} />}
                        onEnter={this.onCreateCollaborator}
                    />
                </Flex>

                {
                    (this.state.collaborators.length == 0) ? <p>No se han agregado colaboradores para el evento.</p> :
                        <Grid
                            py={2}
                            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                            gap={4}
                        >
                            {this.state.collaborators.map((item) => (
                                <Card
                                    key={item.id}
                                    textHead={item.username}
                                    textBody={item.organizer.name}
                                />
                            ))}
                        </Grid>
                }

            </Box>

        );
    }
};

export default CollaboratorList;
