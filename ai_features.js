async function purchaseCoinsWithTelebirr(amount, price) {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Dursa login godhi!");

  try {
    const response = await fetch('/api/telebirr-pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid, amount: amount, price: price })
    });

    const result = await response.json();
    if(result.success) {
      window.location.href = result.paymentUrl;
    } else {
      alert("Kaffaltii jalqabsiisuun hin danda'amne!");
    }
  } catch (err) {
    console.error("Payment error:", err);
  }
}
