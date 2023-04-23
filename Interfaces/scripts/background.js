chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request && request.action === "getCookies") {
      chrome.cookies.getAll({ url: request.message }, function(cookies) {

          let data = [];

          for(cookie of cookies) {
            data.push({
              name: cookie.name,
              value: cookie.value
            });
          }

          sendResponse(JSON.stringify(data));
          return false;
      });
      return true;
    }
});