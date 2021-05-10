import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend} from 'recharts';
import { Text,Box, Center} from '@chakra-ui/core';
import dataJSON from './mock'

const mockObject = JSON.parse(dataJSON)

function getAditionalData(){
    let data = mockObject.data.candidates
    let totalVotes = mockObject.data.totalVotes
    data.forEach(element => {
        var valueType1 = "fullName"
        var valueContent1 = element.firstName + " " + element.lastName
        element[valueType1] = valueContent1
        var valueType2 = "percentage"
        var valueContent2 = (Math.round((element.voteCount*100/totalVotes + Number.EPSILON) * 1000) / 1000) + "%";
        element[valueType2] = valueContent2
    });
    return data.sort(function(a, b){
        return b.voteCount - a.voteCount;
    });
}

const CustomTooltip = ({ active, payload, label }: any)=> {
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
                <p className="label1">{`Nombre : ${payload[0].payload.fullName}`}</p>
                <p className="label2">{`Votos : ${payload[0].value}`}</p>
                <p className="desc">{`Porcentaje : ${label}`}</p>
                <Center>
                    <img src = {`${payload[0].payload.imageUrl}`} width = "100px" height = "100px"/>
                </Center>
        </Box>
      )
    }
  
    return null;
};

const renderColorfulLegendText = (value: string, entry: any) => {
    return <Text color="black" display = "inline-flex">{value}</Text>;
};

export default class Chart extends PureComponent {  
    render() {
        const data = getAditionalData()  
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
                            content={<CustomTooltip />} 
                        />
                        <YAxis fontSize = "14px" fontWeight = "bold" axisLine = {false}/>
                        <Legend formatter={renderColorfulLegendText}/>
                        <Bar dataKey="voteCount" name = "Votos" fill='url(#rainGradient)' barSize={160}>
                            <LabelList dataKey="fullName" position="top" fontSize = "14px" fontFamily = "monospace"/>
                            <LabelList dataKey="voteCount" position="center" fill = "white" fontSize = "14px" fontWeight = "bold"/>
                        </Bar>
                        
                </BarChart>
            </ResponsiveContainer>
            
        )
    }
}