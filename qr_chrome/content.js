chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'captureScreen') {
      html2canvas(document.body).then(canvas => {
        canvas.toBlob(blob => {
          let reader = new FileReader();
          reader.onloadend = () => {
            sendResponse({ screenshotUrl: reader.result });
          };
          reader.readAsDataURL(blob);
        });
      });
      return true; // Will respond asynchronously.
    }
  });
  