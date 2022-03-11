import TopNavBar from '@/layout/TopNavBar';
import styles from './index.module.less';
import G2DualAxes from '@/components/G2/Column/index';
import DoubleHistogram from '@/components/DoubleHistogram/index';
const MyReport = () => {
  return (
    <div>
      <TopNavBar title="我的报告"></TopNavBar>
      <div className={styles.chartContainer}>
        {/* <G2DualAxes></G2DualAxes> */}
        <DoubleHistogram></DoubleHistogram>
      </div>
    </div>
  );
};

export default MyReport;
