import styles from './index.module.less';
import { useState, createContext } from 'react';
import CheckPhone from './checkPhone/index';
import CheckCode from './checkCode/index';

// export const StepContext = createContext(0);

const Login = () => {
  const [useStep, setUseStep] = useState(1);
  const [usePhoneNumber, setUsePhoneNumber] = useState('');
  return (
    <div className={styles.main}>
      {useStep === 1 ? (
        <CheckPhone
          useStep={useStep}
          setUseStep={setUseStep}
          usePhoneNumber={usePhoneNumber}
          setUsePhoneNumber={setUsePhoneNumber}></CheckPhone>
      ) : (
        <CheckCode mobile={usePhoneNumber}></CheckCode>
      )}
    </div>
  );
};
export default Login;
