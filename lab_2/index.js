
// Блок для читання текстового файлу, та конвертування в масив класним one-liner'ом
const fs = require('fs')

const makeArrayFromTextFile = (path) => {
    const text = fs.readFileSync(path, 'utf-8')
    const arr = text.trim().split('\n')
    return arr.map( (element) => element.split(',').map((el) => parseFloat(el)))
}

let storage = {};
let total_result = {
    all_prices: [],
    profit: [],
    outcome: []
};

( function run() {
    const data = makeArrayFromTextFile('data.txt')
    console.log("Масив даних:", data)

    storage.price = [data[0][0] , data[1][0]]
    storage.income = [data[0][1], data[1][1]]
    storage.lost_money = [data[0][3], data[1][3]]
    storage.probability = [data[0][2], data[0][4], ...data[2]]
    console.dir(storage)
})();





console.log(`\t\t\t ______________________________________`);
console.log(`\t\t\t|                                      \t|`);
console.log(`\t\t\t|    Таблиці вхідних даних для вузлів  \t|`);
console.log(`\t\t\t|______________________________________\t|`);


console.log(`Вузол A1. Побудова великого заводу уже.`);
console.log();
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід       |      ` + storage.income[0] + `           ` + storage.lost_money[0]);
console.log(`Ймовірність |      ` + storage.probability[0] + `          ` + storage.probability[1]);
total_result.profit.push(calculate_outcome(1, storage.probability[0], storage.income[0], storage.probability[1], storage.lost_money[0], 5));
total_result.outcome.push(total_result.profit[0] - storage.price[0]);
console.log(`__________________________________________`);
console.log();

console.log(`Вузол A2. Побудова малого заводу уже.\n`);
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід       |      ` + storage.income[1] + `           ` + storage.lost_money[1]);
console.log(`Ймовірність |      ` + storage.probability[0] + `          ` + storage.probability[1]);
console.log();
total_result.profit.push(calculate_outcome(1, storage.probability[0], storage.income[1], storage.probability[1], storage.lost_money[1], 5));
total_result.outcome.push(total_result.profit[1] - storage.price[1]);
console.log(`__________________________________________\n`);

console.log(`Вузол A3. Побудова великого заводу через 1 рік. Ймовірність - ` +storage.probability[2] + `\n`);
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід      |      ` + storage.income[0] + `           ` + storage.lost_money[0]);
console.log(`Ймовірність|      ` +storage.probability[4] + `          ` +storage.probability[5]);
console.log();
total_result.profit.push(calculate_outcome(storage.probability[2],storage.probability[4], storage.income[0],storage.probability[5], storage.lost_money[0], 4));
total_result.outcome.push(total_result.profit[2] - storage.price[0]);
console.log(`__________________________________________\n`);

console.log(`Вузол A4. Побудова малого заводу через 1 рік. Ймовірність - ` +storage.probability[4] + `\n`);
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід      |      ` + storage.income[1] + `           ` + storage.lost_money[1]);
console.log(`Ймовірність|      ` +storage.probability[4] + `          ` +storage.probability[5]);
console.log();
total_result.profit.push(calculate_outcome(storage.probability[3],storage.probability[4], storage.income[1],storage.probability[5], storage.lost_money[1], 4));
total_result.outcome.push(total_result.profit[3] - storage.price[1]);
console.log(`__________________________________________`);
console.log();

console.log(`\t\t\t ______________________________________`);
console.log(`\t\t\t|                                      \t|`);
console.log(`\t\t\t|    Таблиця очікуваних доходів     \t|`);
console.log(`\t\t\t|______________________________________\t|\n\n\n`);

console.log(`\tВузол\tОГВ\t\tВартості\t\tОчікувані доходи через 5 років`);
console.log(`_____________________________________________`);
let max = 0;
let min = total_result.outcome[0];
let index1 = 0;
let index2 = 0;
for (let i = 0; i < 4; i++)
{
    if (total_result.outcome[i] > max)
    {
        max = total_result.outcome[i];
        index1 = i + 1;
    }
    if (total_result.outcome[i] < min)
    {
        min = total_result.outcome[i];
        index2 = i + 1;
    }
    total_result.all_prices = [storage.price[0], storage.price[1], storage.price[0], storage.price[1]];
    console.log(`\t${(i + 1)}\t${round(total_result.profit[i], 1)}\t\t${total_result.all_prices[i]}\t\t${round(total_result.profit[i], 2)}`);
}

console.log();
console.log(`Найефективніше рішення - ${index1} з доходом ${max} тис.`);
console.log(`Найменш ефективне рішення - ${index2} зі збитками ${(min * -1)} тис.`);

function calculate_outcome(prob, income_p, income, loss_p, loss, years) {
    return prob * (income_p * income + loss_p * loss) * years;
}

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
