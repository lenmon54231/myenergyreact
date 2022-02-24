import { memo, useEffect, useState } from 'react';
import { NavBar, Space, Toast } from 'antd-mobile';
import { SearchOutline, MoreOutline } from 'antd-mobile-icons';
import { getHomeTestList } from '@/api/home/home';
import { useNavigate } from 'react-router-dom';

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
  const nav = useNavigate();
  useEffect(() => {
    console.log('触发更新');
    getHomeTestList().then((res) => {
      console.log(res, '11111111');
      setTestList([...testList, ...res?.result]);
    });
  }, []);
  return (
    <div>
      <NavBar right={right} onBack={back}>
        标题
      </NavBar>
      {testList.map((e) => {
        return (
          <div
            onClick={() => {
              nav('/highLevelTest');
            }}
            key={e?.id}>
            {e?.name}
          </div>
        );
      })}

      {/* <LoadingView /> */}
    </div>
  );
};
export default memo(Home);
