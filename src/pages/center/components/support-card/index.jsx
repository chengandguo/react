import React, { useState } from 'react';

function SupportCard() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>I am support card</h1>
      <p>count: {count}</p>
      <div onClick={() => setCount(count+1)}>count + 1</div>
    </div>
  );
}

export default SupportCard;
