import './lib/api.js';

console.log(ApiClient);

clnt = ApiClient("http://127.0.0.1:8000");
clnt.checkPage("https://e1mo.de/google");

console.log(chrome.tab);
