import SingleTestCard from '@/components/SingleTestCard';

const DoubleTestCard = (props) => {
  const testChildrenInfo = props.testChildrenInfo;
  return (
    <div className="flex items-center justify-between mb-1">
      {testChildrenInfo.map((e) => {
        return <SingleTestCard key={e?.evaluateType} singleTestInfo={e} />;
      })}
    </div>
  );
};

export default DoubleTestCard;
