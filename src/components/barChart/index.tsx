import React, { PureComponent ,  Component} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend} from 'recharts';
import { Text,Box, Center} from '@chakra-ui/core';
import { Election } from '@/data/election/model/election.model';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import * as CandidateMapper from '@/data/candidate/api/mapper/candidate.mapper'
import { Candidate } from '@/data/candidate/model/candidate.model';

interface ElectionObject {
    election: Election
}

interface ListCandidates {
    candidates: Candidate[]
}

class Chart extends PureComponent<ElectionObject, ListCandidates> {  
    candidateRepository: CandidateRepository
    electionId: number
    
    constructor(props: ElectionObject) {
        super(props)
        this.candidateRepository = CandidateRepository.getInstance()
        this.electionId = props.election.id

        this.state = {
            candidates: []
        }
    }

    async getCandidates() {
        try {
            const res = await this.candidateRepository.getAllByElection(this.electionId)
            const candidates = CandidateMapper.getAllToCandidateList(res)
            return candidates
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async componentDidMount(){
        let currentCandidates = []
        currentCandidates = await this.getCandidates()
        this.setState({
            candidates: currentCandidates
        })
    }

    getTotalVotes(data){
        let totalVotes = 0
        for(const item of data){
            totalVotes += item.voteCount
        }
        return totalVotes
    }

    getAditionalData(){
        let data = this.state.candidates
        let totalVotes = this.getTotalVotes(data)
        data.forEach(element => {
            var fullNameType = "fullName"
            var fullNameContent = element.firstName + " " + element.lastName
            element[fullNameType] = fullNameContent
            var percentageType = "percentage"
            var percentageContent = (Math.round((element.voteCount*100/totalVotes + Number.EPSILON) * 1000) / 1000) + "%";
            element[percentageType] = percentageContent
        });
        return data.sort(function(a, b){
            return b.voteCount - a.voteCount;
        });
    }

    CustomTooltip = ({ active, payload, label }: any)=> {
        if (active && payload && payload.length) {
          return (
            <Box 
                className="custom-tooltip" 
                backgroundColor = "white"
                borderColor = "gray.400"
                borderWidth = "1px"
                padding = "4px"
                fontWeight = "bold"
                fontSize = "12px"
                >
                    <p className="fullNameLabel">{`Nombre : ${payload[0].payload.fullName}`}</p>
                    <p className="voteLabel">{`Votos : ${payload[0].value}`}</p>
                    <p className="percentageLabel">{`Porcentaje : ${label}`}</p>
                    <Center>
                        <img src = {`${payload[0].payload.imageUrl}`} width = "100px" height = "100px"/>
                    </Center>
            </Box>
          )
        }
      
        return null;
    };

    renderColorfulLegendText = (value: string, entry: any) => {
        return <Text color="black" display = "inline-flex">{value}</Text>;
    };
    
    render() {
        const data = this.getAditionalData()  
        return (
            <ResponsiveContainer width="99%" height={500}>
                <BarChart 
                    width={300} 
                    height={450} 
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >   
                        <defs>
                            <linearGradient id = "rainGradient" x1 = "0" y1 = "0" x2 = "0" y2 = "1">
                                <stop offset = "0%" stopColor = "#3066BE"/>
                                <stop offset = "100%" stopColor = "#3066BE88"/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            vertical = {true}
                            strokeDasharray="3 3" 
                            stroke = "#d6d9da"
                        />
                        <XAxis dataKey="percentage" tickLine={false} fontSize = "14px" fontWeight = "bold" axisLine = {false}/>
                        <Tooltip 
                            active = {true}
                            cursor = {false}
                            allowEscapeViewBox = {{x:false, y:false}} 
                            content={<this.CustomTooltip />} 
                        />
                        <YAxis fontSize = "14px" fontWeight = "bold" axisLine = {false}/>
                        <Legend formatter={this.renderColorfulLegendText}/>
                        <Bar dataKey="voteCount" name = "Votos" fill='url(#rainGradient)' barSize={160}>
                            <LabelList dataKey="fullName" position="top" fontSize = "14px" fontFamily = "monospace"/>
                            <LabelList dataKey="voteCount" position="center" fill = "white" fontSize = "14px" fontWeight = "bold"/>
                        </Bar>
                        
                </BarChart>
            </ResponsiveContainer>
        )
    }
}
export default Chart;