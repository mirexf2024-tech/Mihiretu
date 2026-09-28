// Tab Filter: FYP vs Following
function loadFeeds(tabType) {
  const user = firebase.auth().currentUser;
  let videoQuery = db.collection('videos');

  if (tabType === 'following' && user) {
    // Vidiyoowwan namoota inni follow godhe qofa fiduu
    db.collection('users').doc(user.uid).get().then(doc => {
      const followingList = doc.data().following || [];
      if (followingList.length > 0) {
        videoQuery.where('userId', 'in', followingList).get().then(displayVideos);
      } else {
        alert("Nama tokkollee follow hin goone. For You tab ilaali!");
      }
    });
  } else {
    // For You Page (FYP): Vidiyoowwan Baay'ee Like fi View qaban dhiyeessuu
    videoQuery.orderBy('likes', 'desc').limit(20).get().then(displayVideos);
  }
}

function displayVideos(snapshot) {
  console.log("Vidiyoowwan dhiyaatan:", snapshot.docs.length);
  // UI Render Loop
}
