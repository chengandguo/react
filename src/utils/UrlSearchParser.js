
export class URLSearchParser {
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

  getAll () {
    return this.searchParams;
  }
}

/*
  @description: url search params join , {name: "Reeo", age: 1} => "name=Reeo&age=1"

*/
export function urlSearchJoin(options={}, filterInvalid=false) {
  if(Object.prototype.toString.call(options) !== "[object Object]") {
    console.warn(`parameters ${options} should be an object`);
    return "";
  }
  let result = "",
    invalidArr = [null, undefined, ""];
  for(let [key, value] of Object.entries(options)) {
    if(filterInvalid && invalidArr.includes(value)) continue;
    result += key + "=" + value + "&";
  }
  return result.slice(0, result.length-1);
}

