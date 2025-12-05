import { formatText } from './replaceAll.js'
import { comments } from './comments.js'

import { renderComments } from './renderComments.js'
import { loadComments } from './loadComments.js'

export function addCommentListener() {
    document.querySelector('.add-form-button').addEventListener('click', () => {
        const commName = formatText(document.querySelector('.add-form-name'))
        const commText = formatText(document.querySelector('.add-form-text'))
        const commContainer = document.querySelector('.comments')
        const loadText = document.createElement('li')
        loadText.textContent = 'Комментарий загружается'
        commContainer.appendChild(loadText)
        fetch('https://wedev-api.sky.pro/api/v1/jeldnesss/comments', {
            method: 'POST',
            body: JSON.stringify({
                text: commText,
                name: commName,
            }),
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                }
                if (response.status === 400) {
                    return response.json().then((data) => {
                        throw new Error(data.error)
                    })
                }
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }
                throw new Error('Что-то пошло не так')
            })
            .then(() => loadComments())
            .then(() => {
                loadText.remove()
                document.querySelector('.add-form-text').value = ''
                document.querySelector('.add-form-name').value = ''
            })
            .catch((error) => {
                loadText.remove()
                alert(error.message)
            })
    })
}

export function addLikeListener() {
    const likeBtns = document.querySelectorAll('.like')

    likeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index
            const comment = comments[index]
            if (comment.isLiked) {
                comment.isLiked = false
                comment.likesCount--
            } else {
                comment.isLiked = true
                comment.likesCount++
            }
            renderComments()
            commentListeners()
        })
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

export function commentListeners() {
    replyListener()
    addLikeListener()
}
