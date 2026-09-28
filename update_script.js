// Function Coin bituu fooyya'e (Kaffaltii malee Coin hin dabalu)
function buyCoins(coinAmount, priceETB) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Kaffaltii raawwachuuf dursa login godhadhu!");
    return;
  }

  // Confirm dialogue kaffaltii
  const confirmPayment = confirm(`Coins ${coinAmount} bitachuuf ${priceETB} ETB Telebirr kaffaluu ni feetaa?`);
  
  if (confirmPayment) {
    // Order ID adda ta'e uumuu
    const orderId = "ORD_" + Date.now();
    
    alert(`Kaffaltiin ${priceETB} ETB processed irra jira.\nLakk. Order: ${orderId}\n\nTelebirr irraa kaffaltiin yeroo mirkanaa'u otomaatikiin account keetti dabalama!`);

    // Gara Backend Server (server.js) request erguu
    fetch('/api/telebirr-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        outTradeNo: orderId,
        tradeStatus: 'PENDING', // Automatic Telebirr approval eega
        totalAmount: priceETB,
        userId: user.uid,
        coinsToAdd: coinAmount
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Kaffaltiin xumura eegaa jira:", data);
    })
    .catch(err => {
      console.error("Error kaffaltii:", err);
    });
  }
}
