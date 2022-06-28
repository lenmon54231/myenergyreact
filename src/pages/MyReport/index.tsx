import TopNavBar from '@/layout/TopNavBar';
import styles from './index.module.less';
import G2DualAxes from '@/components/G2/Column/index';
import DoubleHistogram from '@/components/DoubleHistogram/index';
import DoubleHistogramByCanvas from '@/components/DoubleHistogramByCanvas/index';
import Polygon from '@/components/Polygon/index';

const MyReport = () => {
  return (
    <div>
      <TopNavBar title="我的报告"></TopNavBar>
      <div className={styles.chartContainer}>
        {/* <G2DualAxes></G2DualAxes> */}
        {/* <DoubleHistogram></DoubleHistogram> */}
        {/* <DoubleHistogramByCanvas> </DoubleHistogramByCanvas> */}
        <Polygon></Polygon>
      </div>
    </div>
  );
};

export default MyReport;
