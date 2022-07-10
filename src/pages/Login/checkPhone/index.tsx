import { Input, Button } from 'antd-mobile';
import styles from './index.module.less';
import { login } from '@/api/login/index';

const CheckPhone = (props: any) => {
  const { useStep, setUseStep, usePhoneNumber, setUsePhoneNumber } = props;
  const sendCode = async () => {
    if (usePhoneNumber.length > 10) {
      const res = await login({ mobile: usePhoneNumber, type: '3' });
      setUseStep(2);
    }
  };
  // const step = useContext(StepContext);
  return (
    <div className={styles.main}>
      <div>
        <div className="m-1 text-base font-bold">短信验证码登录</div>
        <div className="m-1">若手机号未注册，我们将为您自动注册{useStep}</div>
      </div>
      <div className="w-11/12 m-1">
        <Input
          placeholder="请输入手机号"
          clearable
          onChange={(value) => {
            setUsePhoneNumber(value);
          }}
        />
      </div>
      <div
        className={styles.getCodeByPhone}
        onClick={() => {
          sendCode();
        }}>
        <Button>获取验证码</Button>
      </div>
    </div>
  );
};
export default CheckPhone;
