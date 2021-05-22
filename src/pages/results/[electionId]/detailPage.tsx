import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { Election } from '@/data/election/model/election.model';
import Chart from '@/components/barChart/barchart'
import html2canvas from 'html2canvas';
import { ElectionResultDto } from '@/data/election/api/dto/election.result.dto';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { DownloadIcon } from '@chakra-ui/icons';

interface ElectionResultProps {
    results: ElectionResultDto
}

const ElectionResult = (props: ElectionResultProps) => {

    let { results } = props;

    let jsPDF = null;

    if (typeof window !== "undefined") {
        import("jspdf").then(module => {
            jsPDF = module.default;
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

    function exportPdf() {
        window["html2canvas"] = html2canvas
        html2canvas(document.querySelector("#ResponsiveChart")).then((canvas) => {
            document.body.appendChild(canvas);
            const imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape', 'px', 'a4', 'false');
            pdf.setFont('Helvertica', 'bold')
            pdf.text(60, 40, results.election.name)
            pdf.setFont('Helvertica', 'normal')
            pdf.text(60, 60, "Resultados finales obtenidos para la actividad de elección.")
            pdf.addImage(imgData, 'PNG', 65, 110, 500, 250);
            pdf.save(`Election-${results.election.id}-results.pdf`);
        });
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
