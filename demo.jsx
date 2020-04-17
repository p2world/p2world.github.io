import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  useEffect(()=> {
      console.log('new ', count);
      document.title = 'a ' + count;
  }, [count]);

  return (
    <div>
      <p>You clicked {count1} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => {
          setCount1(count1 + 1)
          setCount(count)
      }}>
        Click me1
      </button>
    </div>
  );
}

ReactDOM.render(
    <Example/>,
    document.getElementById('app')
);