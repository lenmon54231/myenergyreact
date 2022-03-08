import { memo, useEffect, useState } from 'react';
import { getHomeTestList } from '@/api/home/index';
import styles from './index.module.less';
import TopNavBar from '@/layout/TopNavBar';
import BigTest from '@/components/BigTest/index';

type testListSingle = {
  detailIntro: string;
  evaluateType: number;
  id: string;
  img: string;
  intro: string;
  name: string;
  size: number;
};

type testList = Array<testListSingle>;

const Home = () => {
  const [testList, setTestList] = useState<testList>([]);

  useEffect(() => {
    getHomeTestList().then((res) => {
      setTestList([...testList, ...res?.result]);
    });
  }, []);
  return (
    <div>
      <TopNavBar />
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
