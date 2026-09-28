async function uploadVideoToCloudinary(file) {
  const cloudName = "zkyyos4t"; 
  const uploadPreset = "ml_default"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    alert("1. Vidiyoon Cloudinary'tti fe'amaa jira, mee eegi...");
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.secure_url) {
      alert("2. Vidiyoon Cloudinary irratti fe'ameera!");
      return data.secure_url;
    } else {
      alert("Error Cloudinary: " + (data.error ? data.error.message : "Upload failed"));
      return null;
    }
  } catch (err) {
    alert("Network Error: Intarneti kee mirkaneeffadhu!");
    return null;
  }
}

async function handlePost() {
  const fileInput = document.querySelector('input[type="file"]');
  const captionInput = document.querySelector('input[type="text"]');
  
  const file = fileInput ? fileInput.files[0] : null;
  const caption = captionInput ? captionInput.value : "";

  if (!file) {
    alert("Mee dursa vidiyoo filadhu!");
    return;
  }

  const videoUrl = await uploadVideoToCloudinary(file);

  if (videoUrl) {
    try {
      alert("3. Database Firestore irratti save gochaa jira...");
      await firebase.firestore().collection("videos").add({
        videoUrl: videoUrl,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0
      });
      alert("Milkaa'ina: Vidiyoon kee post ta'eera!");
      window.location.reload();
    } catch (e) {
      alert("Error Firestore: " + e.message);
    }
  }
}

// Function kana global window irratti makuu
window.handlePost = handlePost;
