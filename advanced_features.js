// ==========================================
// 1. IN-APP DIRECT MESSAGING (DM & CHAT)
// ==========================================

// Ergaa dhuunfaa (Message) erguu
function sendMessage(receiverId, messageText) {
  const sender = firebase.auth().currentUser;
  if (!sender) {
    alert("Ergaa erguuf dursa log in godhadhu!");
    return;
  }

  if (!messageText.trim()) return;

  const chatId = [sender.uid, receiverId].sort().join("_");

  db.collection('chats').doc(chatId).collection('messages').add({
    senderId: sender.uid,
    receiverId: receiverId,
    text: messageText,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    console.log("Ergaan sirriitti ergameera!");
  }).catch(err => {
    console.error("Chat Error:", err);
  });
}

// Ergaa real-time dubbisuu (Listen for new messages)
function listenForMessages(receiverId, callback) {
  const sender = firebase.auth().currentUser;
  if (!sender) return;

  const chatId = [sender.uid, receiverId].sort().join("_");

  db.collection('chats').doc(chatId).collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      let messages = [];
      snapshot.forEach(doc => messages.push(doc.data()));
      callback(messages);
    });
}

// ==========================================
// 2. CREATOR ANALYTICS DASHBOARD
// ==========================================

function loadCreatorAnalytics() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  db.collection('videos').where('userId', '==', user.uid).get()
    .then(snapshot => {
      let totalViews = 0;
      let totalLikes = 0;
      let videoCount = snapshot.docs.length;

      snapshot.forEach(doc => {
        const data = doc.data();
        totalViews += (data.views || 0);
        totalLikes += (data.likes || 0);
      });

      alert(`📊 Analytics Kee (TOPTIK Creator):\n\n` +
            `🎬 Baay'ina Vidiyoowwanii: ${videoCount}\n` +
            `👁️ Waliigala Views: ${totalViews}\n` +
            `❤️ Waliigala Likes: ${totalLikes}\n` +
            `💰 Est. Earnings: ${(totalViews * 0.05).toFixed(2)} ETB`);
    })
    .catch(err => console.error("Analytics Error:", err));
}
