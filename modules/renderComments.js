import { comments } from './comments.js'

const commentContainer = document.querySelector('.comments')

function renderComments() {
    commentContainer.innerHTML = ''
    comments.forEach((comment, index) => {
        const commentHTML = `
                <li class="comment">
                <div class="comment-header">
                    <div id="name">${comment.name}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div id="commentText" class="comment-text">
                    ${comment.text}
                    </div>
                </div>   
                <div class="comment-footer">
                    <div class="likes">
                    <span class="likes-counter">${comment.likesCount}</span>
                    <button class="like ${comment.isLiked ? 'active-like' : 'like-button'}" data-index="${index}"></button>
                    </div>
                </div>
                </li>
                `
        commentContainer.innerHTML += commentHTML
    })
}
export { renderComments }
