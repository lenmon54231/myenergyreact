import styles from './index.module.less';
import { login, getToken } from '@/api/login/index';
import { Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
const CheckCode = (props: any) => {
  const { mobile } = props;
  const nav = useNavigate();
  const sendCode = async () => {
    const res = await login({ mobile: mobile, type: '3' });
  };
  const checkInputCode = async (value: string) => {
    console.log(value, '111111');
    if (value.length === 6) {
      const res = await getToken({ loginName: mobile, code: value });
      console.log('res: ', res);
      if (res?.status === 200) {
        sessionStorage.setItem('wanxueEnergyToken', JSON.stringify(res.result));
        sessionStorage.setItem('token', res?.result?.token);
        nav('/');
      } else {
        Toast.show({
          content: '验证码错误',
          afterClose: () => {
            console.log('after');
          },
        });
      }
    }
  };
  return (
    <div className={styles.main}>
      <div>
        <div className="m-1 text-base font-bold">输入验证码</div>
        <div className="m-1">验证码已发送到19900000099</div>
      </div>
      <div className="w-11/12 m-1">
        <Input
          placeholder="请输入内容"
          clearable
          onChange={(value) => {
            checkInputCode(value);
          }}
        />
      </div>
      <div
        className={styles.getCodeByPhone}
        onClick={() => {
          sendCode();
        }}>
        <Button>重新获取</Button>
      </div>
    </div>
  );
};

export default CheckCode;
