import { Box, Center, color, Text } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import boxtingTheme from '@/theme/theme';
import PageTitle from '@/components/pageTitle';
import { Election } from '@/data/election/model/election.model';
import Chart from '@/components/barChart'
import html2canvas from 'html2canvas';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import * as CandidateMapper from '@/data/candidate/api/mapper/candidate.mapper'
import 'jspdf-autotable'
import { ElectionResultDto } from '@/data/election/api/dto/election.result.dto';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { DownloadIcon } from '@chakra-ui/icons';

interface ElectionResultProps {
    results: ElectionResultDto
}

const ElectionResult = (props: ElectionResultProps) => {

    let { results } = props;
    
    const candidateRepository = CandidateRepository.getInstance()

    const [appState, setAppState] = useState({
        candidates: null,
        images:null,
        loading:null
    });
    
    useEffect(() => {
        setAppState({ loading: true, candidates: null, images:null });

        const fetchData = async () => {
            try {
                const res = await candidateRepository.getAllByElection(election.id)
                const candidates = await CandidateMapper.getAllToCandidateList(res)
                let images = []
                candidates.forEach(element =>{
                    toDataUrl(element.imageUrl, (myBase64) => {
                        images.push(myBase64)
                    });
                })
                setAppState({ loading: false, candidates: candidates, images: images })
            } catch (error) {
                setAppState({ loading: false, candidates: null, images: null });
            }
        }

        fetchData()
    }, [setAppState]);
    
    function getTotalVotes(data){
        let totalVotes = 0
        for(const item of data){
            totalVotes += item.voteCount
        }
        return totalVotes
    }

    function getAditionalData(){
        let data = appState.candidates
        let totalVotes = getTotalVotes(data)
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
    
    const toDataUrl = (url, callback) => {
        const xhr = new XMLHttpRequest();
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        xhr.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', proxyUrl + url);
        xhr.responseType = 'blob';
        xhr.send();
    };
    
    function generateTable(data){
        let tableData = [];
        const images = appState.images
        for(let i = 0; i < data.length + 1; i++)
        {   
            let rowData = []
            rowData.push('\n\n');
            if(i < data.length){
                rowData.push(`${data[i].fullName}`);
                rowData.push(`${data[i].voteCount}`);
                rowData.push(`${data[i].percentage}`);
            }
            else{
                rowData.push(' ');
                rowData.push(getTotalVotes(data));
                rowData.push('100.000%');
            }
            tableData.push(rowData);
        }
        return tableData
    }

    let jsPDF = null;

    if (typeof window !== "undefined") {
        import("jspdf").then(module => {
            jsPDF = module.default;
        });
    }
    
    function exportPdf(){
        window["html2canvas"] = html2canvas
        const candidate = getAditionalData()
        const images = appState.images
        let cont = 0
        html2canvas(document.querySelector("#ResponsiveChart")).then((canvas) => {
           document.body.appendChild(canvas); 
           const imgData = canvas.toDataURL('image/png');
           var pdf = new jsPDF('landscape', 'px', 'a4', 'false');
           pdf.setFont('Helvetica', 'bold')
           pdf.text(60,40,election.name)
           pdf.setFont('Helvetica', 'normal')
           pdf.setFontSize(14);
           pdf.text(60,60,election.information)
           pdf.addImage(imgData, 'PNG', 65, 110,500, 250);
           pdf.addPage()
           pdf.autoTable({
               theme: 'plain',
               styles: { minCellHeight: 22, lineWidth: 0.5, font:'times'},
               bodyStyles: { halign: 'center', valign: 'middle'},
               headStyles: { halign: 'center', valign: 'middle', textColor:'black'},
               head: [[{content: 'TOTAL DE VOTOS', colSpan: 4, styles: {fontStyle:'bold', fillColor: boxtingTheme.colors.primary, textColor:'white'}}],
                    ['LOGO','CANDIDATO', 'TOTAL', '%TOTAL']],
               body: generateTable(candidate),     
               didDrawCell: function(data) {
                if (data.column.index === 0 && data.cell.section === 'body') {
                    var dim = data.cell.height - data.cell.padding('vertical');
                    if(cont<images.length){
                        pdf.addImage(images[cont], 'PNG', data.cell.x + 30, data.cell.y + 1.5, dim + 4.5, dim + 4.5);
                    }
                    cont += 1
                }
              }
            })
           pdf.save("download.pdf"); 
           document.body.removeChild(canvas); 
       });
    }

    const router = useRouter();

    if (results == undefined) {
        //return <Center>Ocurrió un error al intentar obtener los resultados de la actividad seleccionada.</Center>;
        results = {
            election: {
                id: "1",
                name: "Test election"
            },
            candidates: [
                {
                    electionId: "1",
                    firstName: "Rodrigo",
                    id: "1",
                    imageUrl: "none",
                    lastName: "Guadalupe",
                    voteCount: 3
                },
                {
                    electionId: "1",
                    firstName: "Enzo",
                    id: "2",
                    imageUrl: "none",
                    lastName: "Lizama",
                    voteCount: 2
                }
            ],
            totalVotes: 5
        }
    }

    return (
        <Box id="CandidateChart">
            <PageTitle
                title={results.election.name}
                description={"Resultados finales obtenidos para la actividad de elección."}
                onBackClick={() => router.push(
                    {
                        pathname: `/results/`,
                    },
                    `/results/`,
                )}
                enableBackIcon
                disableInfoIcon
            />
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Exportar a pdf"
                typeBtn={ButtonType.primary}
                leftIcon={<DownloadIcon />}
                onEnter={exportPdf}
            />

            <Center
                width="85%"
                position="relative"
                top="50px"
                style={{ marginRight: '12px', marginBottom: '48px' }}
                display="block"
                id="ResponsiveChart">
                <Chart results={results} />
            </Center>

        </Box>
    );
};

export default ElectionResult;
