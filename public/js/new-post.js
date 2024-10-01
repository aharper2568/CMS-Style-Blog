const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const image = document.querySelector('#image').files[0]; // Get the selected file
  
    if (title && content) {
        // Create a FormData object to handle both text and file data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Append the image file to the form data
        }
  
        // Use fetch to send the form data
        const response = await fetch('/api/post', {
            method: 'POST',
            body: formData, // Send the FormData object
            // Note: Do NOT set 'Content-Type' to 'application/json' for FormData
        });
  
        if (response.ok) {
            document.location.replace('/'); // Redirect to homepage after creating the post
        } else {
            alert('Failed to create post');
        }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);
  