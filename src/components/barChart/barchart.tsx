import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import { Text, Box, Center } from '@chakra-ui/core';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import * as CandidateMapper from '@/data/candidate/api/mapper/candidate.mapper'
import { ElectionResultDto } from '@/data/election/api/dto/election.result.dto';

interface ChartProps {
    results: ElectionResultDto
}

const Chart = (props: ChartProps) => {

    const { results } = props;


    function getAditionalData() {
        let data = results.candidates

        data.forEach(candidate => {
            var fullNameType = "fullName"
            var fullNameContent = candidate.firstName + " " + candidate.lastName
            candidate[fullNameType] = fullNameContent
            var percentageType = "percentage"
            var percentageContent = (Math.round((candidate.voteCount * 100 / results.totalVotes + Number.EPSILON) * 1000) / 1000) + "%";
            candidate[percentageType] = percentageContent
        });

        return data.sort(function (a, b) {
            return b.voteCount - a.voteCount;
        });
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    className="custom-tooltip"
                    backgroundColor="white"
                    borderColor="gray.400"
                    borderWidth="1px"
                    padding="4px"
                    fontWeight="bold"
                    fontSize="12px"
                >
                    <p className="fullNameLabel">{`Nombre : ${payload[0].payload.fullName}`}</p>
                    <p className="voteLabel">{`Votos : ${payload[0].value}`}</p>
                    <p className="percentageLabel">{`Porcentaje : ${label}`}</p>
                    <Center>
                        <img src={`${payload[0].payload.imageUrl}`} width="100px" height="100px" />
                    </Center>
                </Box>
            )
        }

        return null;
    };

    const renderColorfulLegendText = (value: string, entry: any) => {
        return <Text color="black" display="inline-flex">{value}</Text>;
    };


    return (
        <ResponsiveContainer width="99%" height={500}>
            <BarChart
                width={300}
                height={450}
                data={getAditionalData()}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6200EE" />
                        <stop offset="60%" stopColor="#6200EE" />
                        <stop offset="100%" stopColor="#fff" />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    vertical={true}
                    strokeDasharray="3 3"
                    stroke="#d6d9da"
                />
                <XAxis dataKey="percentage" tickLine={false} fontSize="14px" fontWeight="bold" axisLine={false} />
                <Tooltip
                    active={true}
                    cursor={false}
                    allowEscapeViewBox={{ x: false, y: false }}
                    content={<CustomTooltip />}
                />
                <YAxis fontSize="14px" fontWeight="bold" axisLine={false} />
                <Legend formatter={renderColorfulLegendText} />
                <Bar dataKey="voteCount" name="Votos" fill='url(#rainGradient)' barSize={160}>
                    <LabelList dataKey="fullName" position="top" fontSize="14px" fontFamily="monospace" />
                    <LabelList dataKey="voteCount" position="center" fill="white" fontSize="14px" fontWeight="bold" />
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    )
}
export default Chart;