// Блок для читання текстового файлу, та конвертування в масив класним one-liner'ом
const fs = require('fs')

const makeArrayFromTextFile = (path) => {
    const text = fs.readFileSync(path, 'utf-8')
    const arr = text.trim().split('\r\n')
    return arr.map( (element) => element.split(',').map((el) => parseFloat(el)))
}

let storage = {};
let total_result = {};

(function run() {
    const data = makeArrayFromTextFile('data.txt')
    console.log("Масив даних:", data)

    storage.weights = data.map((row) => row[0]);
    storage.matrix = data.map((row) => [row[1],row[2],row[3],row[4],row[5]]);
    console.dir(storage);

    total_result.normal_sums = calculateNormalSums();
    total_result.weighted_sums = calculateWeightedSums();

    console.dir(total_result);

    // let index_keys = Object.keys(storage.weights).map((el) => el+1);


    console.log("Результати обчислень:");
    console.log(`_____________\t_____\t_______________________________________________________________________`);
    console.log(` № параметра|\tВаги|\t\t\t\t\tСередні значення узагальненої думки \t\t\t\t  |`);
    console.log(`_____________\t_____\t______________________________________________________________________/`);
    console.log(`            |\t    |\tKrakens |\tUFT(Котячі вушка) \t| HX Cloud\t\t|HX Stinger|Sennheizer|`);
    console.log(`_____________\t_____\t______________________________________________________________________/`);
    storage.matrix.forEach((row, index) => {
        console.log(`    ${index + 1}\t\t\t0.${Math.round(storage.weights[index] * 100)}|\t ${row[0]/4}\t|\t ${row[1]/4}\t\t\t\t|\t ${row[2]/4}\t\t|\t\t${row[3]/4}\t\t |${row[4]/4}`);
    });
    console.log(`_____________\t_____\t______________________________________________________________________/`);
    console.log(`Cума        |\t\t|\t ${total_result.normal_sums[0]}\t|\t${total_result.normal_sums[1]}\t\t\t\t|\t ${total_result.normal_sums[2]}\t\t\t|\t\t${total_result.normal_sums[3]}\t\t |${total_result.normal_sums[4]}`);
    console.log(`Cума зважена|\t\t|\t ${total_result.weighted_sums[0]}\t|\t${total_result.weighted_sums[1]}\t\t\t\t| ${total_result.weighted_sums[2]}\t\t|\t\t${total_result.weighted_sums[3]}\t |${total_result.weighted_sums[4]}`);
    let names = ['Krakens' ,'UFT(Котячі_вушка)','HX_Cloud','HX_Stinger', 'Sennheizer'];
    let temp_obj = {};
    total_result.result = {};
    total_result.weighted_sums.forEach((sum, i) => total_result.result[names[i]]= sum);
    let print_res = Object.entries(total_result.result).sort(((a, b) => b[1] - a[1]))
    print_res = print_res.map((row) => row[0]);
    console.log("Результат вибору: ", Object.values(print_res).join('>'));



    function calculateNormalSums() {

        let multiplied_matrix = [];
        for(let row of storage.matrix) {
            multiplied_matrix.push(row.map((el) => el/4));
        }
        console.log(multiplied_matrix);
        let result = multiplied_matrix.reduce((column_sum, row) => {
            row.forEach((cur_element, index) => {
                column_sum[index] = (column_sum[index]) + cur_element;
            });
            return column_sum;
        }, [0, 0, 0, 0, 0]);
        return result;
    }

    function calculateWeightedSums() {
        let multiplied_matrix = [];
        for(let row of storage.matrix) {
            multiplied_matrix.push(row.map((el) => el/4));
        }
        console.log(multiplied_matrix);
        let row_index = 0;
        let result = multiplied_matrix.reduce((column_sum, row) => {
            row.forEach((cur_element, col_index) => {
                column_sum[col_index] = Math.round((column_sum[col_index] + cur_element * storage.weights[row_index]) * 10000) / 10000;
            });
            row_index++;
            return column_sum;
        }, [0, 0, 0, 0, 0]);
        return result;
    }
})();
