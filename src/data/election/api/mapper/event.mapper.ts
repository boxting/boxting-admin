import { Election } from "../../model/election.model";
import { GetAllElectionsResponseDto } from "../dto/response/get.all.response.dto";
import { GetOneElectionResponseDto } from "../dto/response/get.one.response.dto";

export async function getAllToEventList(response: GetAllElectionsResponseDto): Promise<Election[]> {

    const electionList: Election[] = response.data.map((value) => {
        let election: Election = {
            id: value.id,
            typeId: value.typeId,
            information: value.information,
            name: value.name,
            eventId: value.eventId,
            winners: value.winners
        }
        return election
    })

    return electionList
}

export async function getOneToEvent(response: GetOneElectionResponseDto): Promise<Election> {

    const election: Election = {
        id: response.data.id,
        typeId: response.data.typeId,
        information: response.data.information,
        name: response.data.name,
        eventId: response.data.eventId,
        winners: response.data.winners
    }

    return election
}