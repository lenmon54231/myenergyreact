import { Button, SearchBar, Space, Toast, CheckList } from 'antd-mobile';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { useRef, useContext } from 'react';
import { InitContext } from '@/pages/AnswerPage/index';
const GapFill = () => {
  const searchRef = useRef<SearchBarRef>(null);
  const { result, setResult } = useContext(InitContext);
  const getSearchResult = (value: string) => {};
  const choseAnswer = (value: string[]) => {
    console.log('value: ', value[0]);
    console.log(result, 'result');
    let obj = {
      questionId: '1111',
      optionsId: '2222',
      result: value[0],
      questionNumber: 1,
    };
    let arr = [...result, obj];
    setResult && setResult(arr);
  };
  return (
    <div>
      <SearchBar
        ref={searchRef}
        placeholder="请输入内容"
        style={{ '--background': '#ffffff' }}
        showCancelButton
        onSearch={(val) => {
          Toast.show(`你搜索了：${val}`);
        }}
        onChange={(val) => {
          getSearchResult(val);
        }}
        onClear={() => {
          Toast.show('清空内容');
        }}
        onCancel={() => {
          Toast.show('取消搜索');
        }}
      />
      <CheckList
        defaultValue={['B']}
        onChange={(val) => {
          choseAnswer(val);
        }}>
        <CheckList.Item value="A">A</CheckList.Item>
        <CheckList.Item value="B">B</CheckList.Item>
        <CheckList.Item value="C">C</CheckList.Item>
        <CheckList.Item value="D">D</CheckList.Item>
      </CheckList>
    </div>
  );
};
export default GapFill;
