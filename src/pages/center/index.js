import "./index.scss";

import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class


export default function Autocomplete(props) {
  const { onSelectItem } = props;
  const [ value, setValue ] = useState("");
  const [ list, setList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const queryListRequest = (q) => {
    const params = { q };
    setIsLoading(true);
    axios.get(ITEMS_API_URL, { params }).then(res => {
      if(Array.isArray(res)) {
        setList(res);
      } else {
        setList([]);
      }
    }).catch( error => {
      setList([]);
    }).finally( () => {
      setIsLoading(false);
    });
  };
  
  const queryListRequestDebounce = useCallback(lodash.debounce(queryListRequest, DEBOUNCE_DELAY), [])

  const handleInputChange = async (e) => {
    const value = e?.target?.value;
    setValue(value);
    queryListRequestDebounce(value);
  }

  const handleSelectItem = (item) => {
    console.log(item);
    typeof onSelectItem === "function" && onSelectItem(item);
  }

  return (
    <div className="wrapper">
      <div className={classnames("control", {"isLoading": isLoading})}>
        <input type="text" className="input" value={value} onChange={handleInputChange}/>
      </div>
      {list.length > 0 && <div className="list is-hoverable">
        {
          list.map((item, index) => <a className="list-item" key={index} onClick={() => handleSelectItem(item)}>{item}</a>)
        }
      </div>}
    </div>
  );
}


  // const queryListRequest = (q) => {
  //   const params = { q };
  //   setIsLoading(true);
  //   console.count();
  //   return new Promise((resolve) => {
  //     window.setTimeout( () => {
  //       resolve(["a", "b", "c", undefined]);
  //       setList(["a", "b", "c"]);
  //       setIsLoading(false)
  //     }, 1000);
  //   });
  // };