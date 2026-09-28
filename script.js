async function handlePost(event) {
  if (event) event.preventDefault();

  alert("1. Button-ni sirriitti hojjechaa jira!");

  const fileInput = document.getElementById('videoFile') || document.querySelector('input[type="file"]');
  const captionInput = document.getElementById('videoCaption') || document.querySelector('input[type="text"]');

  const file = fileInput ? fileInput.files[0] : null;
  const caption = captionInput ? captionInput.value : "";

  if (!file) {
    alert("Mee dursa vidiyoo filadhu!");
    return;
  }

  alert("2. Vidiyoon Cloudinary'tti fe'amaa jira, mee eegi...");

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch("https://api.cloudinary.com/v1_1/zkyyos4t/video/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.secure_url) {
      alert("3. Vidiyoon Cloudinary irratti fe'ameera!");
      
      // Save to Firestore if Firebase is ready
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        alert("4. Firestore irratti save gochaa jira...");
        await firebase.firestore().collection("videos").add({
          videoUrl: data.secure_url,
          caption: caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          likes: 0
        });
        alert("Milkaa'ina: Vidiyoon kee post ta'eera!");
        window.location.reload();
      } else {
        alert("Cloudinary Upload Milkaa'eera! (Firebase disconnect ta'us vidiyoon fe'ameera)");
      }
    } else {
      alert("Error Cloudinary: " + (data.error ? data.error.message : JSON.stringify(data)));
    }
  } catch (err) {
    alert("Network Error: " + err.message);
  }
}
