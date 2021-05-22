import { Box, Flex, Grid, Select } from '@chakra-ui/core';
import React, { Component } from 'react';
import Card from '@/components/card';
import { Election } from '@/data/election/model/election.model';
import { Event } from '@/data/event/model/event.model';
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import * as ElectionMapper from '@/data/election/api/mapper/election.mapper'
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
    currentEvent: string | undefined,
    error: boolean
    loading: boolean
}

// Needs to be a React Component because screen updates on create/delete/update
class ElectionList extends Component<ElectionListProps, ElectionListState> {

    electionsRepository: ElectionRepository
    router: NextRouter

    constructor(props: ElectionListProps) {
        super(props)

        this.electionsRepository = ElectionRepository.getInstance()
        this.router = this.props.router

        this.onSelectEvent = this.onSelectEvent.bind(this)

        this.state = {
            elections: [],
            events: [],
            currentEvent: undefined,
            error: false,
            loading: false
        }
    }

    async getElections(eventId: string) {
        try {
            const res = await this.electionsRepository.getAll(eventId)
            const elections = ElectionMapper.getAllToElectionList(res)
            return elections
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })

        try {
            let propEvents = this.props.events
            let propCurrentEvent = this.props.default
            let currentElections = []

            if (propCurrentEvent != undefined && propEvents.length != 0) {
                currentElections = await this.getElections(propCurrentEvent)
            } else if (propEvents.length != 0) {
                currentElections = await this.getElections(propEvents[0].id.toString())
                propCurrentEvent = propEvents[0].id.toString()
            }

            this.setState({
                elections: currentElections,
                events: propEvents,
                currentEvent: propCurrentEvent,
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
            let currentElections = []

            if (selectedEvent == undefined || selectedEvent == '') {
                selectedEvent = undefined
            } else {
                currentElections = await this.getElections(selectedEvent)
            }

            this.setState({
                currentEvent: selectedEvent,
                elections: currentElections,
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
                                                status={item.eventStatus}
                                                disabled={item.eventStatus != EventStatusEnum.ENDED}
                                                onEnter={() =>
                                                    this.router.push(
                                                        `/results/[electionId]`,
                                                        `/results/${item.id}`,
                                                    )}
                                            />
                                        ))}
                                    </Grid>
                }

            </Box>

        );
    }
};

export default ElectionList;
