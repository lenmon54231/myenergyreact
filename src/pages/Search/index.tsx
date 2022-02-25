import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const nav = useNavigate();
  return (
    <div
      className="tabbar_page"
      style={{ backgroundColor: 'blue' }}
      onClick={() => nav('/other1')}>
      Search
    </div>
  );
};
export default memo(Search);
