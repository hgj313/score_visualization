import * as ExcelJS from 'exceljs'

const workbook = new ExcelJS.Workbook();

export interface GradeRecord {
    region: string;
    position: string;
    name: string;
    single_choice: number;
    mutiple_choices: number;
    judgment: number;
    statement: number;
    case_review: number;
    total: number;
}

export async function getdata(): Promise<GradeRecord[]> {
    await workbook.xlsx.readFile('./examine_grade.xlsx');
    const worksheet = workbook.getWorksheet(1);
    const data: GradeRecord[] = [];

    worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
            const regionCellValue = row.getCell(1).value;
            const positionCellValue = row.getCell(2).value;
            const nameCellValue = row.getCell(3).value;
            const singleChoiceCellValue = row.getCell(4).value;
            const mutipleChoicesCellValue = row.getCell(5).value;
            const judgmentCellValue = row.getCell(6).value;
            const statementCellValue = row.getCell(7).value;
            const caseReviewCellValue = row.getCell(8).value;
            const safeRegion = typeof regionCellValue === 'string' ? regionCellValue : '';
            const safePositionCellValue = typeof positionCellValue === 'string' ? positionCellValue : '';
            const safeNameCellValue = typeof nameCellValue === 'string' ? nameCellValue : '';
            const safeSingleChoiceCellValue = typeof singleChoiceCellValue === 'number' ? singleChoiceCellValue : 0;
            const safeMutipleChoicesCellValue = typeof mutipleChoicesCellValue === 'number' ? mutipleChoicesCellValue : 0;
            const safeJudgmentCellValue = typeof judgmentCellValue === 'number' ? judgmentCellValue : 0;
            const safeStatementCellValue = typeof statementCellValue === 'number' ? statementCellValue : 0;
            const safeCaseReviewCellValue = typeof caseReviewCellValue === 'number' ? caseReviewCellValue : 0;
            
            const safeTotalCellValue = safeSingleChoiceCellValue+safeMutipleChoicesCellValue+safeJudgmentCellValue+safeStatementCellValue+safeCaseReviewCellValue;

            data.push({
                region: safeRegion,
                position: safePositionCellValue,
                name: safeNameCellValue,
                single_choice: safeSingleChoiceCellValue,
                mutiple_choices: safeMutipleChoicesCellValue,
                judgment: safeJudgmentCellValue,
                statement: safeStatementCellValue,
                case_review: safeCaseReviewCellValue,
                total: safeTotalCellValue,
            });
        }
    });

    return data;
}

