import SingleTestCard from '@/components/SingleTestCard';
import { Key } from 'react';

const DoubleTestCard = (props: { testChildrenInfo: any }) => {
  const testChildrenInfo = props.testChildrenInfo;
  return (
    <div className="flex items-center justify-between mb-1">
      {testChildrenInfo.map((e: { evaluateType: Key | null | undefined }) => {
        return <SingleTestCard key={e?.evaluateType} singleTestInfo={e} />;
      })}
    </div>
  );
};

export default DoubleTestCard;
