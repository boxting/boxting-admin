import { Box, Flex, Select } from '@chakra-ui/core';
import React, { Component } from 'react';
import { Event } from '@/data/event/model/event.model';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { NextRouter } from 'next/router';
import { UserRepository } from '@/data/user/repository/users.repository';
import { User } from '@/data/user/model/user.model';
import MUIDataTable from 'mui-datatables';
import { VotersTableOptions } from '@/content/datatable.options';
import { VotersTableColumns } from '@/content/datatable.columns';

interface VoterListProps {
    events: Event[],
    default: string | undefined,
    router: NextRouter
}

interface VoterListState {
    voters: User[],
    events: Event[],
    currentEvent: string | undefined
}

// Needs to be a React Component because screen updates on create/delete/update
class VoterList extends Component<VoterListProps, VoterListState> {

    userRepository: UserRepository
    router: NextRouter
    _isMounted = false;

    constructor(props: VoterListProps) {
        super(props)

        this.userRepository = UserRepository.getInstance()
        this.router = this.props.router

        this.onSelectEvent = this.onSelectEvent.bind(this)
        this.onUnsubscribeVoter = this.onUnsubscribeVoter.bind(this)

        this.state = {
            voters: [],
            events: [],
            currentEvent: undefined
        }
    }

    async getVoters(eventId: string) {
        try {
            const res = await this.userRepository.getAll(eventId, 'voters')
            const voters = UserMapper.getAllToUserList(res)
            return voters
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async componentDidMount() {
        this._isMounted = true
        let propEvents = this.props.events
        let propCurrentEvent = this.props.default
        let currentVoters = []

        if (propCurrentEvent != undefined && propEvents.length != 0) {
            currentVoters = await this.getVoters(propCurrentEvent)
        } else if (propEvents.length != 0) {
            currentVoters = await this.getVoters(propEvents[0].id.toString())
            propCurrentEvent = propEvents[0].id.toString()
        }

        if (this._isMounted) {
            this.setState({
                voters: currentVoters,
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
        let currentVoters = await this.getVoters(selectedEvent)

        this.setState({
            currentEvent: selectedEvent,
            voters: currentVoters
        })
    }

    onUnsubscribeVoter = (index: number) => {
        if (index != undefined) {
            const list = this.state.voters
            list.splice(index, 1)
            this.setState({
                voters: list
            })
        }
    }

    render() {

        // Get table colums configuration
        const tableColumns = VotersTableColumns()

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

                {
                    (this.state.voters.length == 0) ? <p>No se han registrado usuarios votantes para el evento.</p> :
                        <MUIDataTable
                            columns={tableColumns}
                            data={this.state.voters}
                            title={'Listado de votantes'}
                            options={VotersTableOptions}
                        />
                }
            </Box>

        );
    }
};

export default VoterList;
