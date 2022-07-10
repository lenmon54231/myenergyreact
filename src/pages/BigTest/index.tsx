import { memo, useEffect, useState } from 'react';
import TopNavBar from '@/layout/TopNavBar';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getTestInfo } from '@/api/testInfo/index';
import styles from './index.module.less';
import { Button } from 'antd-mobile';
import DoubleTestCard from '@/components/DoubleTestCard/index';
interface testInfo {
  id: string;
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
  const nav = useNavigate();
  console.log(location.state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [testInfo, setTestInfo] = useState<testInfo>({
    id: '',
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
  const goToTest = (path: To) => {
    nav(path + '?id=' + testInfo?.id);
  };
  return (
    <div>
      <TopNavBar title={''}></TopNavBar>
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
          {
            testInfo?.children?.length > 0 ? <DoubleTestCard
            testChildrenInfo={testInfo?.children}></DoubleTestCard> : ''
          }
           </div>
      </div>
      <div className={styles.footerContainer}>
        <div
          className={styles.buttonContainer}
          onClick={() => goToTest('/answerPage')}>
          <Button block color="primary">
            进入测评
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(HighLevelTest);
