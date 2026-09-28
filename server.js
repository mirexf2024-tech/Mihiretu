const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

// Firebase Admin Initialization
if (!admin.apps.length) {
  admin.initializeApp({
    project_id: "toptik-47f84"
  });
}

const db = admin.firestore();

// ----------------------------------------------------
// 1. AI CONTENT MODERATION (Barreeffama Seeraan Ala Ta'e Dhoowwuu)
// ----------------------------------------------------
app.post('/api/ai-moderate', async (req, res) => {
  try {
    const { caption, userId } = req.body;
    
    // Jechoota dhoowwaman/seeraan ala ta'an filter gochuu (Basic AI Logic)
    const bannedKeywords = ['spam', 'hack', 'scam', 'violence'];
    const containsBanned = bannedKeywords.some(word => caption.toLowerCase().includes(word));

    if (containsBanned) {
      return res.status(400).json({ 
        approved: false, 
        message: "Barreeffamni kee seera komunitii TOPTIK cabsa!" 
      });
    }

    return res.status(200).json({ approved: true, message: "Content approved" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------
// 2. AI RECOMMENDATION ENGINE (FYP Smart Feed)
// ----------------------------------------------------
app.post('/api/ai-recommendations', async (req, res) => {
  try {
    const { userId } = req.body;

    // Users history fi views irratti hundaa'ee vidiyoowwan filachuu
    const videosSnapshot = await db.collection('videos')
      .orderBy('views', 'desc')
      .limit(10)
      .get();

    let recommendedVideos = [];
    videosSnapshot.forEach(doc => {
      recommendedVideos.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({ videos: recommendedVideos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 TOPTIK AI-Powered Backend Server Port ${PORT} irratti hojjechaa jira...`);
});
