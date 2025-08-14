


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
      const replyBox = comment.querySelector(".reply-input");
      const sendReplyBtn = replyBox?.querySelector(".send-reply");
      const replyTextarea = replyBox?.querySelector(".reply-textarea");

      replyBtn?.addEventListener("click", () => {
        if (!replyBox) return;

        const isVisible = replyBox.style.display === "flex";
        replyBox.style.display = isVisible ? "none" : "flex";
        replyBtn.textContent = isVisible ? "Reply" : "Cancel";
      });

      sendReplyBtn?.addEventListener("click", () => {
        const replyText = replyTextarea?.value.trim();
        if (!replyText) {
          alert("Please enter a reply before sending.");
          return;
        }

        const replyComment = template.cloneNode(true);
        replyComment.style.display = "block";
        replyComment.querySelector(".c-body").textContent = replyText;

        comment.insertAdjacentElement("afterend", replyComment);

        replyTextarea.value = "";
        replyBox.style.display = "none";
        replyBtn.textContent = "Reply";

        attachCommentListeners(replyComment);
      });
      

        // Edit
        const editBtn = comment.querySelector(".edit");
        
        editBtn?.addEventListener("click", () => {
          const currentComment = editBtn.closest(".comm-div");
          if (!currentComment) return;

          const commentBody = currentComment.querySelector(".c-text");
          const existingTextarea = currentComment.querySelector(".comment-input");
          const isEditing = !!existingTextarea;
        
          if (isEditing) {
            const newText = existingTextarea.value.trim();
            if (newText) {
              commentBody.textContent = newText;
            }
            existingTextarea.remove();
            commentBody.style.display = "block";
            editBtn.textContent = "Edit";
          } else {
            const textarea = document.createElement("textarea");
            textarea.className = "comment-input";
            textarea.value = commentBody.textContent;
        
            commentBody.style.display = "none";
            commentBody.insertAdjacentElement("afterend", textarea);
            textarea.focus();
            editBtn.textContent = "Save";
          }
          console.log(existingTextarea);
        });
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

    function closeModal() {
      modal.style.display = "none";
      backdrop.style.display = "none";
      commentToDelete = null;
    }
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    function trapFocus(modal) {
      const focusableSelectors = [
        'button',
        'a[href]',
        'input',
        'textarea',
        'select',
        '[tabindex]:not([tabindex="-1"])'
      ];
      const focusableElements = modal.querySelectorAll(focusableSelectors.join(','));
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
    
      modal.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
    
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      });
    }
    trapFocus(modal);
    firstEl.focus();
  });


