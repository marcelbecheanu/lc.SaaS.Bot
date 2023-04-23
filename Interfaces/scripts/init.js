window.addEventListener("load", (event) => {
  const path = window.location.pathname;
  console.log(path);
  loadToolBox();
});

/* API */
const API = "http://127.0.0.1:3000/"
function makeRequest({ url, method, data, headers = [] }) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };

    // Convert data to query parameters if the method is "GET"
    if (method === "GET") {
      const params = new URLSearchParams(data).toString();
      url = `${url}?${params}`;
      data = null;
    }

    xhr.open(method, url);
    if (method === "GET") {
      xhr.send();
    } else {
      xhr.setRequestHeader("Content-Type", "application/json");
      for(header of headers){
        xhr.setRequestHeader(header.name, header.value);
      }
      xhr.send(JSON.stringify(data));
    }
  });
}

function getCookies(){
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

/* DOM MANAGER */
function injectHtmlToPage(html, element) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // Update url locality src
  doc.body.querySelectorAll('img').forEach(e => {
    if (e.src.includes('assets')) {
      let src = e.src.split('assets')[1];
      e.src = chrome.runtime.getURL('assets' + src);
    }
  })

  const htmlElement = doc.documentElement.querySelector('body').childNodes;
  element.appendChild(htmlElement[0]);
}

function getSvg(path) {
  return chrome.runtime.getURL(path);
}

function getContentFromHtml(path) {
  let request = new XMLHttpRequest();
  request.open("GET", chrome.runtime.getURL(path), false);
  request.send(null);
  return request.responseText;
}