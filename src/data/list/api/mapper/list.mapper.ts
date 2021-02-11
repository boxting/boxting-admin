import { List } from "../../model/list.model";
import { GetAllListsResponseDto } from "../dto/response/get.all.response.dto";
import { GetOneListResponseDto } from "../dto/response/get.one.response.dto";

export async function getAllToListList(response: GetAllListsResponseDto): Promise<List[]> {

    const listList: List[] = response.data.map((value) => {
        let list: List = {
            id: value.id,
            information: value.information,
            name: value.name,
            electionId: value.electionId,
            imageUrl: value.imageUrl
        }
        return list
    })

    return listList
}

export async function getOneToList(response: GetOneListResponseDto): Promise<List> {

    const list: List = {
        id: response.data.id,
        information: response.data.information,
        name: response.data.name,
        electionId: response.data.electionId,
        imageUrl: response.data.imageUrl
    }

    return list
}