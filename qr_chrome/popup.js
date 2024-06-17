document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('urls', data => {
      const urlList = document.getElementById('urlList');
      if (data.urls && data.urls.length > 0) {
        data.urls.forEach(url => {
          const urlDiv = document.createElement('div');
          urlDiv.className = 'url';
          urlDiv.textContent = url;
          urlList.appendChild(urlDiv);
        });
      } else {
        urlList.textContent = 'No QR code URLs found.';
      }
    });
  });
  