import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import './index.less';
const Index: FC = () => {
  console.log('index');
  return (
    // className="tabbar_page"
    <div>
      <Outlet />
    </div>
  );
};
export default memo(Index);
