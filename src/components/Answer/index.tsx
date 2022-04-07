import styles from './index.module.less';
import { useState, useEffect } from 'react';
const Answer = () => {
  const [testInfoList, setTestInfoList] = useState<Array<any>>([]);
  const [currentTestInfo, setCurrentTestInfo] = useState<any>({});
  useEffect(() => {
    getTestInfoList();
  });
  const getTestInfoList = () => {};
  return (
    <div className={styles.answerContainer}>
      <h1>题干：</h1>
    </div>
  );
};
export default Answer;
