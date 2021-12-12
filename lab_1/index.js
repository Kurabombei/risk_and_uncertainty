
// Блок для читання текстового файлу, та конвертування в масив класним one-liner'ом
const fs = require('fs')

const makeArrayFromTextFile = (path) => {
    const text = fs.readFileSync(path, 'utf-8')
    const arr = text.trim().split('\n')
    return arr.map( (element) => element.split(',').map((el) => parseInt(el)))
}

const probabilities =  [0.55, 0.35, 0.15];

(function run() {
    const array = makeArrayFromTextFile('lab_1/data.txt')
    console.log("Масив даних:", array)

    print_results("Результат за крит. Вальда:", vaald_criteria(array))
    print_results("Результат за крит. Севейджа:", savage_criteria(array))
    print_results("Результат за Максимаксним крит. :", max_max_criteria(array))
    print_results("Результат за крит. Гурвіца:", gurwitz_criteria(array))
    print_results("Результат за крит. Байеса-Лапласа:", bayesa_laplasa_criteria(array))

})()

function print_results( text, result) {
    console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
    console.log(text,'A' + (result + 1))
    console.log("_______________________________________")

}

function max(row) {
    return Math.max(...row)
}

function min(row) {
    return Math.min(...row)
}

function max_index(array) {
    return array.indexOf(max(array))
}

function min_index(array) {
    return array.indexOf(min(array))
}


function min_in_rows(array) {
    let min_array = []

    array.forEach((arr) => {
        min_array.push(Math.min(...arr))
    })

    return min_array
}

function max_in_rows(array) {
    let max_array = []

    array.forEach((arr) => {
        max_array.push(Math.max(...arr))
    })

    return max_array
}

function savage_criteria(array) {
    let savage_array = min_in_rows(array)
    return max_index(savage_array)
}

function vaald_criteria(array) {
    let vaald_array = max_in_rows(array)
    return min_index(vaald_array)
}

function gurwitz_criteria(array) {
    const alpha = 0.5

    let gurwitz_array = []

    let max_array = max_in_rows(array)
    let min_array = min_in_rows(array)

    for (let i = 0; i < max_array.length; i++) {
        gurwitz_array.push(
            (alpha * max_array[i]) + ((1 - alpha) * min_array[i])
        )
    }

    return max_index(gurwitz_array)
}


function bayesa_laplasa_criteria(array) {
    let row_sums_with_probabilities = []
    let sum = 0

    array.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
            sum += row[i] * probabilities[i]
        }
        row_sums_with_probabilities.push(sum)
        sum = 0
    })

    return max_index(row_sums_with_probabilities)
}

function max_max_criteria(array) {
    let vaald_array = max_in_rows(array)
    return max_index(vaald_array)
}
