


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
