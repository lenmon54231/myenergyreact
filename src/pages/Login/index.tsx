import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd-mobile';
import styles from './index.module.less';
import login from '@/api/login/index';

const Login = () => {
  const sendCode = async () => {
    const res = await login({ mobile: '19900000099' });
  };

  return (
    <div className={styles.main}>
      <div>
        <div className="m-1 text-base font-bold">短信验证码登录</div>
        <div className="m-1">若手机号未注册，我们将为您自动注册</div>
      </div>
      <div className="w-11/12 m-1">
        <Input placeholder="请输入内容" clearable />
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

export default Login;
