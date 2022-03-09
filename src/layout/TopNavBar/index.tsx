import { NavBar, Space, Toast } from 'antd-mobile';
import styles from './index.module.less';
import { SearchOutline, MoreOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
const TopNavBar = (props: { title: string }) => {
  const { title } = props;
  const nav = useNavigate();
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  );
  const back = () => {
    nav(-1);
  };

  return (
    <div>
      <div className={styles.navCon}>
        <NavBar right={right} onBack={back}>
          {title}
        </NavBar>
      </div>
      <div className={styles.empty}></div>
    </div>
  );
};

export default TopNavBar;
