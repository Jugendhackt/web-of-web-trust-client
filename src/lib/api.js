var crypto = require('crypto')

export default class ApiClient {
  constructor(apiServer) {
    this.apiServer = apiServer;
  }

  checkPage(url) {
    let domain = this.get_main_domain(url);
    let normal_domain = domain;
    domain = this.sha1(domain, 2)
    let _url = this.apiServer;
    _url += "/domain/"

    console.log(_url)

    let urrrrrl = new URL(_url)
    let params = {"domains": normal_domain}
    Object.keys(params).forEach(key => urrrrrl.searchParams.append(key, params[key]));
    console.log(urrrrrl, params)
    fetch(urrrrrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referrer'
      },
      body: JSON.stringify({"domain": domain})
    }).then(r => r.json()).then(r => console.log(r));
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
    let _domain_parts = domain.split(".");
    return _domain_parts.slice(Math.max(_domain_parts.length - 2, 0)).join(".");
  }

  url_domain(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }
}
