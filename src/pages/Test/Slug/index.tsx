import { useParams } from 'react-router-dom';

const Slug = () => {
  const { slug } = useParams();
  return (
    <div>
      <div>获取的slug的值</div>
      <div>{slug}</div>
    </div>
  );
};

export default Slug;
