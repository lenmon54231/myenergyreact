import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';

const SingleTestCard = (props: { singleTestInfo: any }) => {
  const nav = useNavigate();
  const singleTestInfo = props.singleTestInfo;

  const toPage = (evaluateType: number): void => {
    nav(`/BigTest?id=${evaluateType}`, { state: { id: evaluateType } });
  };
  return (
    <div
      className={styles.singleContainer}
      style={{ backgroundImage: 'url(' + singleTestInfo?.img + ')' }}>
      <div onClick={() => toPage(singleTestInfo?.evaluateType)} className={styles.detailContainer}>详情</div>
      <div className={styles.introContainer}>
        <div>{singleTestInfo?.name}</div>
        {/* <div>{singleTestInfo?.intro}</div> */}
      </div>
    </div>
  );
};

export default SingleTestCard;
