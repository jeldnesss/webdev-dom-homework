"use strict";
    const comments = [];

    const commentContainer = document.querySelector('.comments');

      function formatDate(dateInput) {
        const date = new Date(dateInput);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

      
    
    function renderComments(){
        commentContainer.innerHTML = "";
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
                    <button class="like ${comment.isLiked ? "-active-like" : "like-button"}" data-index="${index}"></button>
                    </div>
                </div>
                </li>
                `;
                commentContainer.innerHTML += commentHTML;
            });
        
        
    }

    document.querySelector('.add-form-button').addEventListener('click', () => {
      const commName = document.querySelector('.add-form-name').value;
      const commText = document.querySelector('.add-form-text').value;
      if (commText.length === 0){
        alert('Напишите отзыв');
        return;
      }
      if(commName.length === 0){
        alert('Введите ваше имя');
        return;
      }
      comments.push({
        name: commName,
        text: commText,
        date: formatDate(new Date()),
        isLiked: false,
        likesCount: 0,
      });
      document.querySelector('.add-form-name').value = '';
      document.querySelector('.add-form-text').value = '';

      renderComments();
    });

    commentContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("like")){
            const index = event.target.dataset.index;
            const comment = comments[index];
            if(comment.isLiked){
                comment.isLiked = false;
                comment.likesCount--;
            } else{
                comment.isLiked = true;
                comment.likesCount++;
            }
        }
        renderComments();
    });

