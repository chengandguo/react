/*
  event emitter created by chengzhen
*/

class EventEmitter {
  obj = {

  };

  dispatch (type, ...args) {
    let obj = this.obj;
    if(type in obj) {
      obj[type].forEach(callback => {
        callback.apply(null, args);
      });
    }
  }

  on (type, callback) {
    if(typeof callback !== "function") {
      console.error(`callback ${callback.name} should be a function`);
      return;
    }
    let obj = this.obj;
    if(type in obj) {
      obj[type].push(callback);
    } else {
      obj[type] = [callback];
    }
  }

  once (type, callback) {
    let callbackWrapper = (...args) => {
      callback.apply(null, args);
      this.off(type);
    }
    this.on(type, callbackWrapper);
  }

  off (type) {
    let obj = this.obj;
    if(type in obj) {
      delete obj[type];
    } else {
      console.warn(`The event ${type} doesn't exist.`)
    }
  }
}