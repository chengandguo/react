class URLSearchParser {
  constructor(url = window.location.href) {
    let pattern = /(\w+)=(\w+)/ig;
    this.searchParams = {};
    url.replace(pattern, (url, key, value) => {
      this.searchParams[key] = value;
    });
  }

  get(key) {
    return this.searchParams[key];
  }

}

export default URLSearchParser;