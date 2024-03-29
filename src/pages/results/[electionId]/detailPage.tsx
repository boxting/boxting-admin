import { Box, Center } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import Chart from '@/components/barChart/barchart'
import html2canvas from 'html2canvas';
import { ElectionResultDto } from '@/data/election/api/dto/election.result.dto';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { DownloadIcon } from '@chakra-ui/icons';
import boxtingTheme from '@/theme/theme';
import 'jspdf-autotable'

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
        return <Center>Los resulados de la actividad de elección seleccionada no se encuentran disponibles en este.</Center>;
    }

    function generateTable(data: any[]) {
        let tableData = []

        for (let i = 0; i < data.length + 1; i++) {
            let rowData = []
            if (i < data.length) {
                rowData.push(`${data[i].fullName}`);
                rowData.push(`${data[i].voteCount}`);
                rowData.push(`${data[i].percentage}`);
            }
            else {
                rowData.push(' ');
                rowData.push(results.totalVotes);
                rowData.push('100.000%');
            }
            tableData.push(rowData);
        }
        return tableData
    }

    function exportPdf() {
        window["html2canvas"] = html2canvas
        
        html2canvas(document.querySelector("#ResponsiveChart")).then((canvas) => {
            document.body.appendChild(canvas);
            const imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape', 'px', 'a4', 'false');
            pdf.setFont('Helvetica', 'bold')
            pdf.text(60, 40, results.election.name)
            pdf.setFont('Helvetica', 'normal')
            pdf.setFontSize(14);
            pdf.text(60, 60, "Resultados finales obtenidos para la actividad de elección.")
            pdf.addImage(imgData, 'PNG', 65, 110, 500, 250);
            pdf.addPage()
            pdf.autoTable({
                theme: 'plain',
                styles: { minCellHeight: 22, lineWidth: 0.5, font: 'times' },
                bodyStyles: { halign: 'center', valign: 'middle' },
                headStyles: { halign: 'center', valign: 'middle', textColor: 'black' },
                head: [[{ content: 'TOTAL DE VOTOS', colSpan: 3, styles: { fontStyle: 'bold', fillColor: boxtingTheme.colors.primary, textColor: 'white' } }],
                ['CANDIDATO', 'TOTAL', '%TOTAL']],
                body: generateTable(results.candidates),
            })
            pdf.save(`Election-${results.election.id}-results.pdf`);
            document.body.removeChild(canvas);
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
