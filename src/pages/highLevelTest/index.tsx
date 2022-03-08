import { memo, useEffect } from 'react';
import TopNavBar from '@/layout/TopNavBar';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getTestInfo } from '@/api/testinfo/index';
const HighLevelTest = () => {
  const location = useLocation();
  console.log(location.state);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(async () => {
    const res = await getTestInfo({ id: searchParams.get('id') });
  }, []);
  return (
    <div>
      <TopNavBar></TopNavBar>
      <div>{searchParams.get('id')}</div>
    </div>
  );
};

export default memo(HighLevelTest);
