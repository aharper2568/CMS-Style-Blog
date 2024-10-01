
document.querySelector('.delete-comment')
.addEventListener('click', async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload(); // Reload the page to see the comment removed
    } else {
      alert('Failed to delete comment');
    }
  }
});

