import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { Election } from '@/data/election/model/election.model';
import Chart from '@/components/barChart/barchart'
import html2canvas from 'html2canvas';

interface ElectionResultProps {
    election: Election
}

const ElectionResult = (props: ElectionResultProps) => {

    const { election } = props;

    let jsPDF = null;

    if (typeof window !== "undefined") {
        import("jspdf").then(module => {
            jsPDF = module.default;
        });
    }

    const router = useRouter();

    if (election == null) {
        return <Center>Ocurrió un error al intentar obtener la información requerida.</Center>;
    }

    function exportPdf() {
        window["html2canvas"] = html2canvas
        html2canvas(document.querySelector("#ResponsiveChart")).then((canvas) => {
            document.body.appendChild(canvas);
            const imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape', 'px', 'a4', 'false');
            pdf.setFont('Helvertica', 'bold')
            pdf.text(60, 40, election.name)
            pdf.setFont('Helvertica', 'normal')
            pdf.text(60, 60, election.information)
            pdf.addImage(imgData, 'PNG', 65, 110, 500, 250);
            pdf.save("download.pdf");
        });
    }

    return (
        <Box id="CandidateChart">
            <PageTitle
                title={election.name}
                description={election.information}
                onBackClick={() => router.push(
                    {
                        pathname: `/results/`,
                        query: { eventId: election.eventId.toString() },
                    },
                    `/results/`,
                )}
                enableBackIcon
                disableInfoIcon
            />
            <Text
                position="relative"
                width="60px"
                cursor="pointer"
                _hover={{ color: "blue.400", transition: ".3s ease all" }}
                _focus={{ boxShadow: "outline" }}
                onClick={exportPdf}
                left="100px"
                top="55px"
                fontSize="12px"
                userSelect="none">
                Descargar
            </Text>
            <Center
                width="85%"
                position="relative"
                top="50px"
                display="block"
                id="ResponsiveChart">
                <Chart election={election as Election} />
            </Center>

        </Box>
    );
};

export default ElectionResult;
