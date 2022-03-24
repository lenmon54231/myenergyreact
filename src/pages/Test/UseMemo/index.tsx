import { useState } from 'react';
import Button from './Button/index';
const App = () => {
  const [name, setName] = useState('名称');
  const [content, setContent] = useState('内容');
  return (
    <>
      <button onClick={() => setName(new Date().getTime())}>name</button>
      <button onClick={() => setContent(new Date().getTime())}>content</button>
      <Button name={name}>{content}</Button>
    </>
  );
};
export default App;
