import { fillComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { commentListeners } from './listeners.js'

let firstLoad = true
export async function loadComments(token) {
    const commContainer = document.querySelector('.comments')
    if (firstLoad) {
        commContainer.innerHTML = `<li><div class="loader"></div></li>`
    }

    try {
        const headers = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch(
            'https://wedev-api.sky.pro/api/v2/jeldnesss/comments',
            { headers },
        )

        if (!response.ok) {
            if (response.status === 500) throw new Error('Сервер упал')
            if (response.status === 401)
                throw new Error('Неавторизованный пользователь')
            throw new Error('Что-то пошло не так')
        }

        const data = await response.json()

        const newComments = data.comments.map((comm) => ({
            name: comm.author.name,
            text: comm.text,
            date: comm.date,
            likesCount: comm.likes,
            isLiked: comm.isLiked,
        }))

        fillComments(newComments)
        renderComments()
        commentListeners(token)
    } catch (error) {
        alert(error.message)
    } finally {
        firstLoad = false
    }
}
