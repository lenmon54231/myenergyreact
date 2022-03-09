import { memo, useEffect, useState } from 'react';
import TopNavBar from '@/layout/TopNavBar';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getTestInfo } from '@/api/testInfo/index';
import styles from './index.module.less';
import { Button } from 'antd-mobile';
import DoubleTestCard from '@/components/DoubleTestCard/index';
interface testInfo {
  name: string;
  detailIntro: string;
  notes: string;
  questionNum: string | number;
  commentsNum: string | number;
  size: string | number;
  children: Array<any>;
}

const HighLevelTest = () => {
  const location = useLocation();
  console.log(location.state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [testInfo, setTestInfo] = useState<testInfo>({
    name: '',
    detailIntro: '',
    notes: '',
    questionNum: '',
    commentsNum: '',
    size: '',
    children: [],
  });

  useEffect(() => {
    const getInfo = async () => {
      const { result } = await getTestInfo(searchParams.get('id'));
      setTestInfo(result);
    };
    getInfo();
  }, []);
  return (
    <div>
      <TopNavBar></TopNavBar>
      <div className={styles.mainTestInfoContainer}>
        <div className={styles.topTitleContainer}>
          <div className="text-base font-bold">{testInfo?.name}</div>
          <div className="flex items-center justify-between">
            <div>{testInfo?.questionNum}道测试题</div>
            <div>{testInfo?.commentsNum}份报告</div>
            <div>{testInfo?.size}人测试</div>
          </div>
        </div>
        <div className={styles.introContainer}>
          <div className="mt-2 text-xs">测试介绍</div>
          <div
            dangerouslySetInnerHTML={{
              __html: testInfo?.detailIntro as unknown as string,
            }}></div>
        </div>
        <div className={styles.introContainer}>
          <div
            dangerouslySetInnerHTML={{
              __html: testInfo?.notes as unknown as string,
            }}></div>
        </div>
        <div className={styles.doubleCardContainer}>
          <DoubleTestCard
            testChildrenInfo={testInfo?.children}></DoubleTestCard>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.buttonContainer}>
          <Button block color="primary">
            进入测评
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(HighLevelTest);
