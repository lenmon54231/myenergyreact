import { To, useNavigate, Outlet } from 'react-router-dom';
import styles from './index.module.less';
const Test = () => {
  const nav = useNavigate();
  const toPage = (path: To) => {
    nav(path);
  };
  const testList = [
    { name: 'useMemo测试', path: '/test/useMemo' },
    { name: '获取路由参数1', path: '/test/1' },
    { name: '获取路由参数2', path: '/test/2' },
  ];
  return (
    <div>
      <div className={styles.tagContainer}>
        {testList.map((e) => {
          return (
            <div
              key={e.path}
              className={styles.tag}
              onClick={() => {
                toPage(e.path);
              }}>
              {e.name}
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Test;
