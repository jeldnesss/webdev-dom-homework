function doHomework(subject, callback) {
    console.log(`Я делаю домашку по ${subject}`)
    callback()
}

doHomework('JavaScript', function () {
    console.log('я закончила')
})

function processItem(array, callback) {
    for (const item of array) {
        callback(item)
    }
}
processItem([10, 22, 33], function (item) {
    console.log('эл', item)
})

function loadData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('дфнные загружены')
        }, 1000)
    })
}
loadData().then((msg) => {
    console.log(msg)
})

function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve('Доступ разрешён')
        } else {
            reject('Отказано в доступ')
        }
    })
}

const age = Number(prompt('Введите ваш возраст'))
checkAge(age)
    .then((msg) => {
        console.log('Успех', msg)
    })
    .catch((err) => {
        console.log('оштбка', err)
    })

function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Шаг 1 завершен')
        })
    })
}
function step2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Шаг 2 завершен')
        })
    })
}
function step3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Шаг 3 завершен')
        })
    })
}

step1()
    .then((msg) => {
        console.log(msg)
        return step2()
    })
    .then((msg) => {
        console.log(msg)
        return step3()
    })
    .then((msg) => {
        console.log(msg)
    })

function findUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve('Пользователь найден')
            } else {
                reject('Некорректный ID')
            }
        }, 1000)
    })
}

async function getUser(id) {
    try {
        const result = await findUser(id)
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
getUser(1)

findUser(1)
    .then((msg) => {
        console.log(msg)
    })
    .catch((err) => {
        console.log(err)
    })
