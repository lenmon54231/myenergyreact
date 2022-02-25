import styles from './index.module.less';

const SingleTestCard = (props: { singleTestInfo: any }) => {
  const singleTestInfo = props.singleTestInfo;
  return (
    <div
      className={styles.singleContainer}
      style={{ backgroundImage: 'url(' + singleTestInfo?.img + ')' }}>
      <div className={styles.detailContainer}>详情</div>
      <div className={styles.introContainer}>
        <div>{singleTestInfo?.name}</div>
        <div>{singleTestInfo?.intro}</div>
      </div>
    </div>
  );
};

export default SingleTestCard;
