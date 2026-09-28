// Referral Code Uumuu fi Affeeruu
function generateReferralCode() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const refCode = "TT-" + user.uid.substring(0, 6).toUpperCase();
  
  // Linkii affeerraa uumuu
  const inviteLink = `https://toptik-47f84.web.app/?ref=${refCode}`;
  
  alert(`🎁 Linkii Affeerraa Kee:\n${inviteLink}\n\nLinkii kanaan namni kaffaltii malee yoo galmaa'e Coins 50 badhaasamta!`);
}

// User haaraan yeroo signup godhu Referral Code Mirkaneessuu
function processReferralBonus(appliedRefCode) {
  const newUser = firebase.auth().currentUser;
  if (!newUser || !appliedRefCode) return;

  db.collection('users').where('refCode', '==', appliedRefCode).get()
    .then(snapshot => {
      if (!snapshot.empty) {
        const referrerDoc = snapshot.docs[0];
        const referrerId = referrerDoc.id;

        // Affeeraadhaaf Coin 50 dabaluu
        db.collection('users').doc(referrerId).update({
          coins: firebase.firestore.FieldValue.increment(50)
        });

        // User haaraafis Coin 20 Badhaasuu
        db.collection('users').doc(newUser.uid).update({
          coins: firebase.firestore.FieldValue.increment(20)
        });

        alert("🎉 Badhaasa Referral: Coins 20 siif dabalameera!");
      }
    });
}
