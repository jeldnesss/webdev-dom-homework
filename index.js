import { comments } from './modules/comments.js'
import { formatDate } from './modules/date.js'
import { renderComments } from './modules/renderComments.js'
import { commentContainer } from './modules/comments.js'
import { formatText } from './modules/replaceAll.js'

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
})
commentContainer.addEventListener('click', (event) => {
    const eventEl = event.target.closest('.comment')
    if (event.target.classList.contains('like')) {
        const index = event.target.dataset.index
        const comment = comments[index]
        if (comment.isLiked) {
            comment.isLiked = false
            comment.likesCount--
        } else {
            comment.isLiked = true
            comment.likesCount++
        }
        renderComments()
        return
    }

    if (eventEl) {
        const prName = eventEl.querySelector('#name').textContent.trim()
        const prText = eventEl.querySelector('#commentText').textContent.trim()

        document.querySelector('.add-form-text').value =
            prName + ', ' + prText + '.'

        return
    }
})
