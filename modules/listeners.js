import { formatText } from './replaceAll.js'
import { comments } from './comments.js'
import { formatDate } from './date.js'
import { renderComments } from './renderComments.js'

export function addCommentListener() {
    document.querySelector('.add-form-button').addEventListener('click', () => {
        const commName = formatText(document.querySelector('.add-form-name'))
        const commText = formatText(document.querySelector('.add-form-text'))
        if (commText.length === 0) {
            alert('Напишите отзыв')
            return
        }
        if (commName.length === 0) {
            alert('Введите ваше имя')
            return
        }
        comments.push({
            name: commName,
            text: commText,
            date: formatDate(new Date()),
            isLiked: false,
            likesCount: 0,
        })
        document.querySelector('.add-form-name').value = ''
        document.querySelector('.add-form-text').value = ''

        renderComments()
        commentListeners()
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
