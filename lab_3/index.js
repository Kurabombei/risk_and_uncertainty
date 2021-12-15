// Блок для читання текстового файлу, та конвертування в масив класним one-liner'ом
const fs = require('fs')

const makeArrayFromTextFile = (path) => {
    const text = fs.readFileSync(path, 'utf-8')
    const arr = text.trim().split('\r\n')
    return arr.map( (element) => element.split('\t'))
}

let storage = {};
let total_result = {};

(function run() {
    const data = makeArrayFromTextFile('data.txt')
    console.log("Масив даних:", data)

    // Storage об'єкт не пригодився
    storage.number_of_voters = [data[0][0],data[1][0],data[2][0],data[3][0],data[4][0],data[5][0]]
    storage.first_place = [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1]]
    storage.second_place = [data[0][2],data[1][2],data[2][2],data[3][2],data[4][2],data[5][2]]
    storage.third_place = [data[0][3],data[1][3],data[2][3],data[3][3],data[4][3],data[5][3]]

    total_result.bord = borda()
    total_result.cond = condorse()

    console.log("Результати обчислень:");
    console.log(`____________ \t` + `___________________\t` + `_________________`);
    console.log(`            |\t` + `За методом Кондорсе\t` + `За методом Борде|`);
    console.log(`____________ \t` + `___________________\t` + `________________/`);
    console.log(`Переможець  |\t` + total_result.cond.winner + `              \t\t` + total_result.bord.winner);
    console.log(`Р. судження |\t` + total_result.cond.result + `    \t` + total_result.bord.result);


    function borda() {
        const borde_result = { A: 0, B: 0, C: 0};

        data.forEach((curRow) => {
            let multiplier_k1 =  (curRow.indexOf('A') === 1) ? 3 : (curRow.indexOf('A') === 2) ? 2 : 1;
            let multiplier_k2 =  (curRow.indexOf('B') === 1) ? 3 : (curRow.indexOf('B') === 2) ? 2 : 1;
            let multiplier_k3 =  (curRow.indexOf('C') === 1) ? 3 : (curRow.indexOf('C') === 2) ? 2 : 1;
            borde_result.A += curRow[0] * multiplier_k1;
            borde_result.B += curRow[0] * multiplier_k2;
            borde_result.C += curRow[0] * multiplier_k3;
            });
        let temp_winner = Object.keys(borde_result).reduce((a, b) => borde_result[a] > borde_result[b] ? a : b);
        let temp = Object.entries(borde_result).sort( (a, b) => b[1]-a[1]);
        borde_result.result = '';
        temp.forEach((curElement, index) => {
            if(index === 0){
                borde_result.result += '' + curElement[0];
            } else {
                borde_result.result += '>' + curElement[0];
            }
        })
        borde_result.winner = temp_winner;
        console.log("borde result:");
        console.dir( borde_result);
        return borde_result;
    }
    function condorse() {
        const condorse_result = { differences: {AB: 0, AC: 0, BC: 0}, result: ""};
        data.forEach((curRow) => {
            condorse_result.differences.AB += (curRow.indexOf('A') < curRow.indexOf('B')) ? parseInt(curRow[0]) : -parseInt(curRow[0]);
            condorse_result.differences.AC += (curRow.indexOf('A') < curRow.indexOf('C')) ? parseInt(curRow[0]) : -parseInt(curRow[0]);
            condorse_result.differences.BC += (curRow.indexOf('B') < curRow.indexOf('C')) ? parseInt(curRow[0]) : -parseInt(curRow[0]);
        });
        let temp_check = { A: 0, B: 0, C: 0};
        for([key, value] of Object.entries(condorse_result.differences)) {
            let letters = key.split('');
            let bigger_bool = value > 0;
            condorse_result.result += (bigger_bool) ? letters[0] + ">" + letters[1] + "; " : letters[1] + ">" + letters[0] + "; "
            if(bigger_bool){
                temp_check[letters[0]] += 1;
            }else {
                temp_check[letters[1]] += 1;
            }
        }

        condorse_result.winner = Object.keys(temp_check).reduce((a, b) => temp_check[a] > temp_check[b] ? a : b);
        console.log("condorse result:");
        console.dir( condorse_result);
        return condorse_result;
    }
})();


