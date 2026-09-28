// Video Editor Controls & Effects
let currentFilter = 'none';
let currentSpeed = 1.0;

// Filter jijjiiruu (Normal, Vintage, Black&White, Bright, Boost)
function applyFilter(filterType) {
  const videoPreview = document.getElementById('uploadVideoPreview');
  if (!videoPreview) return;

  switch (filterType) {
    case 'grayscale':
      videoPreview.style.filter = 'grayscale(100%)';
      currentFilter = 'grayscale';
      break;
    case 'sepia':
      videoPreview.style.filter = 'sepia(80%)';
      currentFilter = 'sepia';
      break;
    case 'brightness':
      videoPreview.style.filter = 'brightness(130%) contrast(110%)';
      currentFilter = 'brightness';
      break;
    case 'contrast':
      videoPreview.style.filter = 'contrast(150%) saturate(120%)';
      currentFilter = 'contrast';
      break;
    default:
      videoPreview.style.filter = 'none';
      currentFilter = 'none';
  }
}

// Speed Jijjiiruu (Slow Motion / Fast Forward)
function changeVideoSpeed(speed) {
  const videoPreview = document.getElementById('uploadVideoPreview');
  if (videoPreview) {
    videoPreview.playbackRate = speed;
    currentSpeed = speed;
    alert(`⚡ Saffisni vidiyoo gara ${speed}x-tti jijjiirameera!`);
  }
}

// Upload & Process edited video metadata to Firestore
function uploadEditedVideo(videoUrl, captionText) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Dura log in godhadhu!");
    return;
  }

  // Hashtags fi Mentions extract gochuu
  const hashtags = (captionText.match(/#[a-zA-Z0-9_]+/g) || []);
  const mentions = (captionText.match(/@[a-zA-Z0-9_]+/g) || []);

  db.collection('videos').add({
    userId: user.uid,
    username: user.displayName || 'fayyadamaa',
    videoUrl: videoUrl,
    caption: captionText,
    hashtags: hashtags,
    mentions: mentions,
    filter: currentFilter,
    speed: currentSpeed,
    likes: 0,
    views: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("🎬 Vidiyoon kee Edit ta'ee sirriitti maxxanfameera!");
  }).catch(err => {
    console.error("Upload Error:", err);
  });
}
