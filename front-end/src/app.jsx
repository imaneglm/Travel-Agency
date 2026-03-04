import React, { useEffect, useState } from 'react';
import { getHello, addNumbers } from './api';  // must match the file name

function App() {
  const [message, setMessage] = useState('');
  const [sum, setSum] = useState(null);

  useEffect(() => {
    getHello().then(data => setMessage(data.message));
  }, []);

  const handleAdd = async () => {
    const result = await addNumbers(5, 7);
    setSum(result.result);
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleAdd}>Add 5 + 7</button>
      {sum !== null && <p>Result: {sum}</p>}
    </div>
  );
}

export default App;
