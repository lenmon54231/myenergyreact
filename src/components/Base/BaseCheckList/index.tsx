import { useState, useEffect, useCallback } from 'react';
import styles from './index.module.less';

const CheckList = (props) => {
  const { onChange, children, multiple } = props;
  const [value, setValue] = useState([]); // 保存答案的数组
  const [childrenCopy, setChildrenCopy] = useState([...children]); // 所有选项的数组

  useEffect(() => {
    let arr = children.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });
    setChildrenCopy(arr);
  }, [children.length]);

  const handleChange = (val) => {
    console.log('val: ', val);
    let innerChildren = val.props.children;
    if (multiple) {
      if (
        value.findIndex((e) => {
          return innerChildren.id === e.id;
        }) !== -1
      ) {
        console.log('删除');
        Object.assign(val, { isChecked: false });
        setValue(value.filter((item) => item.id !== innerChildren.id));
      } else {
        Object.assign(val, { isChecked: true });
        setValue([...value, innerChildren]);
      }
      onChange && onChange([...value, innerChildren]);
    } else {
      let arr = childrenCopy.map((item) => {
        return {
          ...item,
          isChecked: item.props.children.id === innerChildren.id ? true : false,
        };
      });
      setChildrenCopy([...arr]);
      setValue([innerChildren]);
      onChange && onChange([innerChildren]);
    }
  };
  return (
    <div>
      {childrenCopy.map((item) => {
        return (
          <div
            className={`${styles.box} ${item.isChecked ? styles.checked : ''}`}
            onClick={() => {
              handleChange(item);
            }}
            key={item.props.children.id}>
            {item.props.children.content}
          </div>
        );
      })}
    </div>
  );
};

export default CheckList;
