import { formatText } from './replaceAll.js'
import { comments } from './comments.js'

import { renderComments } from './renderComments.js'
import { loadComments } from './loadComments.js'

export function addCommentListener(token) {
    document.querySelector('.add-form-button').addEventListener('click', () => {
        const commText = formatText(document.querySelector('.add-form-text'))

        if (commText.length < 3) {
            alert('Текст должен содержать хотя бы 3 символа')
            return
        }

        const commContainer = document.querySelector('.comments')
        const loadText = document.createElement('li')
        loadText.textContent = 'Комментарий загружается'
        commContainer.appendChild(loadText)

        fetch('https://wedev-api.sky.pro/api/v2/jeldnesss/comments', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                text: commText,
            }),
        })
            .then((response) => {
                if (response.status === 201) return response.json()
                if (response.status === 400)
                    return response.json().then((data) => {
                        throw new Error(data.error)
                    })
                if (response.status === 500) throw new Error('Сервер упал')
                throw new Error('Что-то пошло не так')
            })
            .then(() => loadComments())
            .then(() => {
                loadText.remove()

                document.querySelector('.add-form-text').value = ''
            })
            .catch((error) => {
                loadText.remove()
                alert(error.message)
            })
    })
}

export function addLikeListener(token) {
    const likeBtns = document.querySelectorAll('.like')
    likeBtns.forEach((btn) => {
        btn.onclick = () => {
            if (!token) {
                alert('Ставить лайки могут только авторизованные пользователи')
                return
            }
            const index = btn.dataset.index
            const comment = comments[index]
            comment.isLiked = !comment.isLiked
            comment.likesCount += comment.isLiked ? 1 : -1
            renderComments()
            commentListeners(token)
        }
    })
}

export function replyListener() {
    const commentArea = document.querySelectorAll('.comment')
    commentArea.forEach((comm) => {
        comm.addEventListener('click', (e) => {
            if (e.target.classList.contains('like')) return

            const prName = comm.querySelector('#name').textContent.trim()
            const prText = comm.querySelector('#commentText').textContent.trim()

            document.querySelector('.add-form-text').value =
                prName + ', ' + prText + '.'
        })
    })
}

export function commentListeners(token) {
    replyListener()
    addLikeListener(token)
}
