import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import DoubleTestCard from '@/components/DoubleTestCard/index';
import { Button } from 'antd-mobile';
const BigTest = (props: { testInfo: any }) => {
  const nav = useNavigate();
  const testInfo = props.testInfo;
  const toPage = (evaluateType: number): void => {
    nav(`/BigTest?id=${evaluateType}`, { state: { id: evaluateType } });
  };

  return (
    <div className={styles.bigTestContainer}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <div>{testInfo?.name}</div>
          <div>{testInfo?.intro}</div>
        </div>
        <div onClick={() => toPage(testInfo?.evaluateType)}>
          <Button size="mini">查看测试</Button>
        </div>
      </div>
      {testInfo.evaluateType === 104 ? (
        <div className={styles.imgContainer + ' mb-1'}>
          <img className={styles.img} src={testInfo?.img} alt="" />
        </div>
      ) : (
        <DoubleTestCard testChildrenInfo={testInfo?.children} />
      )}
      <div>测试人数</div>
    </div>
  );
};

export default BigTest;
