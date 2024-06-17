chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: captureScreen
    });
  });
  
  function captureScreen() {
    chrome.runtime.sendMessage({ action: 'captureScreen' }, response => {
      if (response.screenshotUrl) {
        scanQRCode(response.screenshotUrl);
      }
    });
  }
  
  function scanQRCode(dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, img.width, img.height);
      if (code) {
        chrome.storage.local.set({ urls: code.data.split('\n') });
        chrome.action.setPopup({ popup: 'popup.html' });
      }
    };
  }
  