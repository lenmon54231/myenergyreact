import { useMemo } from 'react';
const Button = ({ name, children }) => {
  function changeName(name) {
    console.log('11');
    return name + '改变name的方法';
  }

  const otherName = useMemo(() => changeName(name), [name]);
  // const otherName =changeName(name)
  return (
    <>
      <div>{otherName}</div>
      <div>{children}</div>
    </>
  );
};

export default Button;
