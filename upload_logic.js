async function uploadVideoToCloudinary(file) {
  const cloudName = "zkyyos4t"; 
  const uploadPreset = "ml_default"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary Error:", data);
      return null;
    }
  } catch (err) {
    console.error("Upload network error:", err);
    return null;
  }
}
