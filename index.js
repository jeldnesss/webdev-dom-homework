import { addCommentListener } from './modules/listeners.js'
import { loadComments } from './modules/loadComments.js'
import { token, loginUser } from './modules/auth.js'

loadComments(token)
const loginForm = document.querySelector('.login-form')
const addForm = document.querySelector('.add-form')

document.querySelector('.login-button').addEventListener('click', () => {
    const login = document.querySelector('.login-login').value.trim()
    const password = document.querySelector('.login-password').value.trim()

    if (!login || !password) {
        alert('Введите логин и пароль')
        return
    }

    loginUser(login, password)
        .then(() => {
            alert('Вы успешно вошли!')
            loginForm.style.display = 'none'
            addForm.style.display = 'block'
            console.log('Токен после логина:', token)
            addCommentListener(token)
            loadComments(token)
        })
        .catch((err) => alert(err.message))
})
