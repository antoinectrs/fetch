import fetch from 'node-fetch';
fetch("https://overpass-api.de/api/interpreter", {
  "headers": {
    "accept": "*/*",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://overpass-turbo.eu/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "data=%2F*%0AThis+is+an+example+Overpass+query.%0ATry+it+out+by+pressing+the+Run+button+above!%0AYou+can+find+more+examples+with+the+Load+tool.%0A*%2F%0Anode%0A++%5Bleisure%3Dplayground%5D%0A++(46.51351558059737%2C6.610379219055176%2C46.52349703059344%2C6.642308235168457)%3B%0Aout%3B",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(e => console.log(e))