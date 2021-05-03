import { Box, Flex, Grid, Select } from '@chakra-ui/core';
import React, { Component } from 'react';
import Card from '@/components/card';
import { Election } from '@/data/election/model/election.model';
import { Event } from '@/data/event/model/event.model';
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import * as ElectionMapper from '@/data/election/api/mapper/election.mapper'
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { AddSmallIcon } from '@/components/icons';
import { NextRouter } from 'next/router';
import { EventStatusEnum } from '@/data/utils/event.status.enum';
import { CircularProgress } from '@material-ui/core';

interface ElectionListProps {
    events: Event[],
    default: string | undefined,
    router: NextRouter
}

interface ElectionListState {
    elections: Election[],
    events: Event[],
    currentEvent: string | undefined
    currentEventStatus: number | undefined
    error: boolean
    loading: boolean
}

type ElectionListResponse = { elements: Election[], eventStatus: number }

// Needs to be a React Component because screen updates on create/delete/update
class ElectionList extends Component<ElectionListProps, ElectionListState> {

    electionsRepository: ElectionRepository
    router: NextRouter

    constructor(props: ElectionListProps) {
        super(props)

        this.electionsRepository = ElectionRepository.getInstance()
        this.router = this.props.router

        this.onSelectEvent = this.onSelectEvent.bind(this)
        this.onCreateElection = this.onCreateElection.bind(this)

        this.state = {
            elections: [],
            events: [],
            currentEvent: undefined,
            currentEventStatus: undefined,
            error: false,
            loading: false
        }
    }

    async getElections(eventId: string): Promise<ElectionListResponse> {
        try {
            const res = await this.electionsRepository.getAll(eventId)
            const elections = await ElectionMapper.getAllToElectionList(res)

            let data = {
                elements: elections,
                eventStatus: res.data.eventStatus
            }

            return Promise.resolve(data)
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })

        try {
            let propEvents = this.props.events
            let propCurrentEvent = this.props.default
            let res: ElectionListResponse = {
                elements: [],
                eventStatus: undefined
            }

            if (propCurrentEvent != undefined && propEvents.length != 0) {
                res = await this.getElections(propCurrentEvent)
            } else if (propEvents.length != 0) {
                res = await this.getElections(propEvents[0].id.toString())
                propCurrentEvent = propEvents[0].id.toString()
            }

            this.setState({
                elections: res.elements,
                events: propEvents,
                currentEvent: propCurrentEvent,
                currentEventStatus: res.eventStatus,
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

    onSelectEvent = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ loading: true })
        try {
            let selectedEvent = event.target.value
            let res: ElectionListResponse = {
                elements: [],
                eventStatus: undefined
            }

            if (selectedEvent == undefined || selectedEvent == '') {
                selectedEvent = undefined
            } else {
                res = await this.getElections(selectedEvent)
            }

            this.setState({
                currentEvent: selectedEvent,
                elections: res.elements,
                currentEventStatus: res.eventStatus,
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

    onCreateElection = () => {
        if (this.state.currentEvent != undefined && this.state.currentEvent != '') {
            this.router.push(
                `/events/[eventId]/elections/create/`,
                `/events/${this.state.currentEvent}/elections/create/`
            )
        }
    }

    render() {

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
                    <BoxtingButton
                        text="Nuevo"
                        typeBtn={ButtonType.primary}
                        leftIcon={<AddSmallIcon boxSize={4} />}
                        onEnter={this.onCreateElection}
                        isDisabled={this.state.currentEvent == undefined || this.state.currentEventStatus != EventStatusEnum.NOT_STARTED}
                    />
                </Flex>

                {
                    (this.state.loading) ? <CircularProgress /> :
                        (this.state.error) ? <p>Ocurrió un error al cargar las elecciones del evento.</p> :
                            (this.state.currentEvent == undefined) ? <p>Debes seleccionar un evento del listado.</p> :
                                (this.state.elections.length == 0) ? <p>No se han creado actividades de elección para el evento.</p> :
                                    <Grid
                                        py={2}
                                        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                                        gap={4}
                                    >
                                        {this.state.elections.map((item) => (
                                            <Card
                                                key={item.id}
                                                textHead={item.name}
                                                textBody={item.information}
                                                onEnter={() =>
                                                    this.router.push(
                                                        `/events/[eventId]/elections/[electionId]`,
                                                        `/events/${item.eventId}/elections/${item.id}`,
                                                    )}
                                                status={this.state.currentEventStatus}
                                            />
                                        ))}
                                    </Grid>
                }

            </Box>

        );
    }
};

export default ElectionList;
