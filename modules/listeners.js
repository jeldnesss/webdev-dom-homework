import { formatText } from './replaceAll.js'
import { comments } from './comments.js'

import { renderComments } from './renderComments.js'
import { loadComments } from './loadComments.js'

export function addCommentListener() {
    document.querySelector('.add-form-button').addEventListener('click', () => {
        const commName = formatText(document.querySelector('.add-form-name'))
        const commText = formatText(document.querySelector('.add-form-text'))
        if (commText.length < 3) {
            alert('Текст должен содержать хотя бы 3 символа')
            return
        }
        if (commName.length < 3) {
            alert('Имя должно содержать хотя бы 3 символа')
            return
        }
        fetch('https://wedev-api.sky.pro/api/v1/jeldnesss/comments', {
            method: 'POST',
            body: JSON.stringify({
                text: commText,
                name: commName,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then(() => loadComments())
            .catch((err) => alert(err))
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
