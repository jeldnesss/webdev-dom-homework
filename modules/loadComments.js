import { fillComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { commentListeners } from './listeners.js'

export async function loadComments() {
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
}
