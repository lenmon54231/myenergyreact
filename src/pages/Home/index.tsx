import { memo, useEffect, useState } from 'react';
import { getHomeTestList } from '@/api/home/index';
import styles from './index.module.less';
import TopNavBar from '@/layout/TopNavBar';
import BigTest from '@/components/BigTest/index';
import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { lengthOfLIS, selfCheck, selfCheck2 } from './tetched.js';

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

  const nav = useNavigate();
  useEffect(() => {
    getHomeTestList()
      .then((res) => {
        console.log('res: ', res);
        if (res.status === 200) {
          testList.length = 0;
          setTestList([...testList, ...res?.result]);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
    // lengthOfLIS([9, 2, 5, 4, 3, 7]);
    // selfCheck([9, 2, 5, 4, 3, 7]);
    selfCheck2([9, 2, 5, 4, 3, 7]);
  }, []);
  return (
    <div>
      <TopNavBar title="我的能量" />
      <div className={styles.main}>
        {testList.map((e) => {
          return <BigTest key={e?.id} testInfo={e} />;
        })}
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.buttonContainer}>
          <Button block color="primary" onClick={() => nav('/myReport')}>
            我的报告
          </Button>
        </div>
      </div>
      {/* <LoadingView /> */}
    </div>
  );
};
export default memo(Home);
