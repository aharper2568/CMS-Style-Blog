


document.querySelector('#new-comment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const postId = window.location.pathname.split('/').pop();

  if (content) {
    const response = await fetch(`/post/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
});

const deletePostHandler = async (event) => {
  if (event.target.classList.contains('delete-post')) {
    const postId = window.location.pathname.split('/').pop();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to homepage after deletion
    } else {
      alert('Failed to delete post');
    }
  }
};

// Attach the event listener to the document (event delegation)
document.addEventListener('click', deletePostHandler);