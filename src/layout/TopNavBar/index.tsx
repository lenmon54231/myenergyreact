import { NavBar, Space, Toast } from 'antd-mobile';
import styles from './index.module.less';
import { SearchOutline, MoreOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
const TopNavBar = () => {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  );
  const back = () => {
    useNavigate();
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    });
  };

  return (
    <div>
      <div className={styles.navCon}>
        <NavBar right={right} onBack={back}>
          标题
        </NavBar>
      </div>
      <div className={styles.empty}></div>
    </div>
  );
};

export default TopNavBar;
