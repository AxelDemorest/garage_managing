import {Body, Controller, Post, Res} from '@nestjs/common';
import * as XLSX from 'xlsx';
import {Response} from 'express';

@Controller('api/excel')
export class ExcelController {

    @Post('export')
    async exportToExcel(@Res() res: Response, @Body('tableData') tableData: string) {
        const parsedTableData = JSON.parse(tableData);

        const headers = Object.keys(parsedTableData[0]);
        const data = [headers, ...parsedTableData.map(item => Object.values(item))];

        const ws = XLSX.utils.aoa_to_sheet(data);

        // Ajuster la largeur des colonnes
        ws['!cols'] = headers.map((header, index) => {
            const maxWidth = Math.max(
                ...data.map(row => (row[index] ? row[index].toString().length : 0))
            );
            return {wch: maxWidth + 2}; // Ajouter 2 pour un peu d'espace supplémentaire
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=myfile.xlsx');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
}
