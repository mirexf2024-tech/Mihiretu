// Search bar modal fi logic
function openSearch() {
  const searchTerm = prompt("Vidiyoo ykn fayyadamaa barbaaduu feetu galchaa:");
  if (!searchTerm) return;

  const query = searchTerm.toLowerCase().trim();
  console.log("Barbaadaa jira:", query);

  // Firestore irraa vidiyoowwan title/caption isaaniitiin barbaaduu
  db.collection('videos').get().then(snapshot => {
    let found = false;
    snapshot.forEach(doc => {
      const video = doc.data();
      const caption = (video.caption || '').toLowerCase();
      const username = (video.username || '').toLowerCase();

      if (caption.includes(query) || username.includes(query)) {
        found = true;
        alert(`🎯 Vidiyoon argameera!\n\nUser: @${video.username}\nCaption: ${video.caption}`);
      }
    });

    if (!found) {
      alert("⚠️ Vidiyoon ykn fayyadamaan barbaaddan hin argamne.");
    }
  }).catch(err => {
    console.error("Search Error:", err);
    alert("Kaffaltii/Search irratti rakkoon uumameera.");
  });
}
