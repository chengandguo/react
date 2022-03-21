export default {
  isObject(obj) {
    if(Object.prototype.toString(obj) === "[object Object]") {
      return true;
    }
    return false;
  }
}


export const sleep = time => new Promise(resolve => {
  window.setTimeout( () => {
    resolve();
  }, time);
});