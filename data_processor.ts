import { getdata, GradeRecord } from './grade_view';
import * as fs from 'fs';

interface GradeStats {
    records: GradeRecord[];
    averages: {
        single_choice: number;
        multiple_choices: number;
        judgment: number;
        statement: number; // Note: using 'statement' to match GradeRecord but average calc called it case_view/sum_stat
        case_review: number;
        total: number;
    };
    pass_count: number;
    fail_count: number;
}

async function main() {
    try {
        const data = await getdata();
        
        // 1. Calculate Averages
        const single_choice: number[] = [];
        const multiple_choice: number[] = [];
        const judgment: number[] = [];
        const statement: number[] = [];
        const case_view: number[] = [];
        const total: number[] = [];

        let pass_count = 0;
        let fail_count = 0;

        for (let i = 0; i < data.length; i++) {
            single_choice.push(data[i].single_choice);
            multiple_choice.push(data[i].mutiple_choices);
            judgment.push(data[i].judgment);
            statement.push(data[i].statement);
            case_view.push(data[i].case_review);
            total.push(data[i].total);

            if (data[i].total >= 60) {
                pass_count++;
            } else {
                fail_count++;
            }
        }

        const avg_single = single_choice.length ? single_choice.reduce((a, b) => a + b, 0) / single_choice.length : 0;
        const avg_multiple = multiple_choice.length ? multiple_choice.reduce((a, b) => a + b, 0) / multiple_choice.length : 0;
        const avg_judgment = judgment.length ? judgment.reduce((a, b) => a + b, 0) / judgment.length : 0;
        const avg_statement = statement.length ? statement.reduce((a, b) => a + b, 0) / statement.length : 0;
        const avg_case = case_view.length ? case_view.reduce((a, b) => a + b, 0) / case_view.length : 0;
        const avg_total = total.length ? total.reduce((a, b) => a + b, 0) / total.length : 0;

        const output: GradeStats = {
            records: data,
            averages: {
                single_choice: avg_single,
                multiple_choices: avg_multiple,
                judgment: avg_judgment,
                statement: avg_statement,
                case_review: avg_case,
                total: avg_total
            },
            pass_count,
            fail_count
        };

        // Write to file
        fs.writeFileSync('grade_data.json', JSON.stringify(output, null, 2));
        console.log('Successfully generated grade_data.json');

    } catch (error) {
        console.error('Error processing data:', error);
    }
}

main();


