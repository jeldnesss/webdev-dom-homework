import { addCommentListener } from './modules/listeners.js'
import { loadComments } from './modules/loadComments.js'
import { token, loginUser } from './modules/auth.js'

loadComments(token)
const loginLink = document.querySelector('.login')
const commList = document.querySelector('.comments')
const loginForm = document.querySelector('.login-form')
const addForm = document.querySelector('.add-form')

loginLink.addEventListener('click', () => {
    commList.style.display = 'none'
    loginForm.style.display = 'block'
})

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
            commList.style.display = 'flex'
            loginForm.style.display = 'none'
            loginLink.style.display = 'none'
            addCommentListener(token)
            loadComments(token)
        })
        .catch((err) => alert(err.message))
})
