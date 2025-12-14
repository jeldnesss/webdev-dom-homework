export let token = null

export function loginUser(login, password) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            }
            if (response.status === 400) {
                throw new Error('Неправильный логин или пароль')
            }
            throw new Error('Ошибка сервера')
        })
        .then((data) => {
            token = data.user.token
            return token
        })
}
