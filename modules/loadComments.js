import { fillComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { commentListeners } from './listeners.js'

let firstLoad = true
export async function loadComments() {
    if (firstLoad) {
        const commContainer = document.querySelector('.comments')
        commContainer.innerHTML = `<li><div class="loader"></div></li>`
    }
    const response = await fetch(
        'https://wedev-api.sky.pro/api/v1/jeldnesss/comments',
    )
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
    commentListeners()
    firstLoad = false
}
