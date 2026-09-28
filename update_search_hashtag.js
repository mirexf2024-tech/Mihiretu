// 1. Search Bar Modal & Functionality
function openSearch() {
  let searchInput = prompt("Search #hashtag, @username, ykn vidiyoo:");
  if (!searchInput) return;

  let query = searchInput.toLowerCase().trim();
  
  db.collection('videos').get().then(snapshot => {
    let results = [];
    snapshot.forEach(doc => {
      let data = doc.data();
      let caption = (data.caption || '').toLowerCase();
      let username = (data.username || '').toLowerCase();

      if (caption.includes(query) || username.includes(query)) {
        results.push(data);
      }
    });

    if (results.length > 0) {
      alert(`🎯 Search Results (${results.length}):\n` + 
        results.map(v => `@${v.username}: ${v.caption}`).join("\n\n")
      );
    } else {
      alert("⚠️ Waanti barbaaddan hin argamne.");
    }
  });
}

// 2. Video Upload Functionality (Hashtag & Mention support)
function uploadVideoWithTags(videoUrl, captionText) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Dura log in godhadhu!");
    return;
  }

  // Hashtags (#) fi Mentions (@) extract gochuu
  const hashtags = (captionText.match(/#[a-zA-Z0-9_]+/g) || []);
  const mentions = (captionText.match(/@[a-zA-Z0-9_]+/g) || []);

  db.collection('videos').add({
    userId: user.uid,
    username: user.displayName || 'fayyadamaa',
    videoUrl: videoUrl,
    caption: captionText,
    hashtags: hashtags,   // Array of hashtags [#ethiopia, #toptik]
    mentions: mentions,   // Array of mentions [@mihiretu]
    likes: 0,
    views: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("✅ Vidiyoon #hashtag fi @mention waliin fe'ameera!");
  }).catch(err => {
    console.error("Upload Error:", err);
  });
}
