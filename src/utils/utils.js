export default {
  isObject(obj) {
    if(Object.prototype.toString(obj) === "[object Object]") {
      return true;
    }
    return false;
  }
}