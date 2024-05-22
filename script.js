document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
      if (data.qrCode) {
        document.getElementById('qrCode').innerHTML = `<img src="data:image/png;base64,${data.qrCode}" alt="QR Code">`;
      }
    });
  });
  