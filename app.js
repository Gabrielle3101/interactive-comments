


document.addEventListener("DOMContentLoaded", () => {
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
    const template = document.getElementById("commentTemplate");
    const modal = document.querySelector(".invisible");
    const backdrop = document.querySelector(".modal-backdrop");
    const confirmBtn = modal.querySelector(".yes");
    const cancelBtn = modal.querySelector(".no");
  
    let commentToDelete = null;
  
    //===========================
    // Attach Listeners to Comment
    //===========================
    function attachCommentListeners(comment) {
      const likeBtn = comment.querySelector(".score-plus");
      const dislikeBtn = comment.querySelector(".score-minus");
      const likeCount = comment.querySelector(".score-number");
      const deleteBtn = comment.querySelector(".delete");
      const replyBtn = comment.querySelector(".reply");
  
      // Like
      likeBtn?.addEventListener("click", () => {
        let likes = parseInt(likeCount.textContent) || 0;
        if (likeBtn.classList.contains("liked")) {
          likes--;
          likeBtn.classList.remove("liked");
        } else {
          likes++;
          likeBtn.classList.add("liked");
          dislikeBtn.classList.remove("disliked");
        }
        likeCount.textContent = likes;
      });
  
      // Dislike
      dislikeBtn?.addEventListener("click", () => {
        let likes = parseInt(likeCount.textContent) || 0;
        if (!dislikeBtn.classList.contains("disliked")) {
          dislikeBtn.classList.add("disliked");
          if (likeBtn.classList.contains("liked")) {
            likes--;
            likeBtn.classList.remove("liked");
          }
          likeCount.textContent = likes;
        } else {
          dislikeBtn.classList.remove("disliked");
        }
      });
  
      // Delete
      deleteBtn?.addEventListener("click", () => {
        commentToDelete = comment;
        modal.style.display = "block";
        backdrop.style.display = "block";
      });
  
      // Reply
      replyBtn?.addEventListener("click", () => {
        const replyBox = comment.querySelector(".reply-input");
        if (replyBox) replyBox.style.display = "flex";
      });

        // // Edit
        // const editBtn = comment.querySelector(".edit");
        // const commentBody = comment.querySelector(".c-body");

        // editBtn?.addEventListener("click", () => {
        // const isEditing = editBtn.textContent.toLowerCase() === "save";

        // if (isEditing) {
        //     // Save the edited comment
        //     const textarea = comment.querySelector(".comment-input");
        //     if (textarea) {
        //     commentBody.textContent = textarea.value.trim() || commentBody.textContent;
        //     textarea.remove();
        //     commentBody.style.display = "block";
        //     editBtn.textContent = "Edit";
        //     }
        // } else {
        //     // Switch to edit mode
        //     const textarea = document.createElement("textarea");
        //     textarea.className = "comment-input";
        //     textarea.value = commentBody.textContent;


        //     commentBody.style.display = "none";
        //     commentBody.insertAdjacentElement("afterend", textarea);
        //     editBtn.textContent = "Editing";
        // }
    // });
    }
  
    //===========================
    // Initialize Existing Comments
    //===========================
    document.querySelectorAll(".comm-div").forEach(attachCommentListeners);
  
    //===========================
    // Add New Comment
    //===========================
    document.querySelectorAll(".primary-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = commentInput.value.trim();
        if (text === "") {
          alert("Please enter a comment before sending.");
          return;
        }
  
        const newComment = template.cloneNode(true);
        newComment.style.display = "block";
        newComment.querySelector(".c-body").textContent = text;
  
        commentList.appendChild(newComment);
        commentInput.value = "";
  
        attachCommentListeners(newComment);
      });
    });
  
    //===========================
    // Modal Controls
    //===========================
    confirmBtn.addEventListener("click", () => {
      if (commentToDelete) {
        commentToDelete.remove();
        commentToDelete = null;
      }
      modal.style.display = "none";
      backdrop.style.display = "none";
    });
  
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
      backdrop.style.display = "none";
      commentToDelete = null;
    });
  
    backdrop.addEventListener("click", () => {
      modal.style.display = "none";
      backdrop.style.display = "none";
      commentToDelete = null;
    });
  });


