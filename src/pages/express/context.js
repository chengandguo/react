import React from "react";

export let initialState = {
  address: {
    province: "",
  },

  company: {
    name: "SF",
  },

  parcel: {

  },

  setAddress (province) {
    this.address = {
      ...this.address,
      province
    }
  },
}




export default React.createContext(initialState);