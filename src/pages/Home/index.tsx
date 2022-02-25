import { memo, useEffect, useState } from 'react';
import { NavBar, Space, Toast } from 'antd-mobile';
import { SearchOutline, MoreOutline } from 'antd-mobile-icons';
import { getHomeTestList } from '@/api/home/home';
import BigTest from '@/components/BigTest/index';
import styles from './index.module.less';
const Home = () => {
  const [testList, setTestList] = useState([]);
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  );
  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    });
  useEffect(() => {
    getHomeTestList().then((res) => {
      setTestList([...testList, ...res?.result]);
    });
  }, []);
  return (
    <div>
      <div className={styles.navCon}>
        <NavBar right={right} onBack={back}>
          标题
        </NavBar>
      </div>
      <div className={styles.main}>
        {testList.map((e) => {
          return <BigTest key={e?.id} testInfo={e} />;
        })}
      </div>
      {/* <LoadingView /> */}
    </div>
  );
};
export default memo(Home);
