var crypto = require('crypto')

function sigmoid(t) {
      return 1/(1+Math.pow(Math.E, -t));
}

export default class ApiClient {
  constructor(apiServer) {
    this.apiServer = apiServer;
  }

  checkPage(url, callback) {
    let domain = this.get_main_domain(url);
    let normal_domain = domain;
    domain = this.sha1(domain, 6)
    let _url = this.apiServer;
    _url += "/domain/"

    let urrrrrl = new URL(_url)
    let params = {"domains": domain, "p": 1}
    Object.keys(params).forEach(key => urrrrrl.searchParams.append(key, params[key]));
    let response = fetch(urrrrrl, {
      method: "GET",
      headers: {
        //'Content-Type': 'application/json',
        //'Referrer-Policy': 'no-referrer'
      },
      //body: JSON.stringify({"domain": domain})
    }).then(r => r.json()).then(callback);

  }

  sha1(string, cut=-1) {
    var shasum = crypto.createHash('sha1')
    shasum.update(string)
    let hash = shasum.digest('hex')
    if (cut < 0) {
      return hash
    } else {
      return hash.substr(0, cut);
    }
  }

  get_main_domain(url) {
    let domain = this.url_domain(url);
    console.log(domain)
    return domain
    //let _domain_parts = domain.split(".");
    //return _domain_parts.slice(Math.max(_domain_parts.length - 3, 0)).join(".");
  }

  url_domain(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }

  domain_trust_factor(domain) {
    let score = domain["score"]
    let sum = score[0] - score[1]
    let sum_sig = sigmoid(sum / 10) * 100
    console.log(score, sum, sum_sig)
    return sum_sig
  }

  is_domain_trustworthy(domain) {
    return this.domain_trust_factor(domain) > 50
  }
}
