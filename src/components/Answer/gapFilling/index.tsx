import { SearchBar, Toast, CheckList, DotLoading } from 'antd-mobile';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { useRef, useContext, useState, useCallback } from 'react';
import { InitContext } from '@/pages/AnswerPage/index';
import { getSchoolListByKeyWord } from '@/api/answer/index';
import debounce from 'lodash/debounce';

const GapFill = (props: any) => {
  const searchRef = useRef<SearchBarRef>(null);
  const { result, setResult } = useContext(InitContext);
  const [isShowCheckList, setIsShowCheckList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schoolSearchList, setSchoolSearchList] = useState([]);
  const load = useCallback(
    debounce((p: string) => updateSearchList(p), 800),
    [],
  );
  const updateSearchList = async (value: string) => {
    if (value) {
      const res = await getSchoolListByKeyWord({
        id: props.currentQuestion?.options[0]?.id,
        key: value,
        optionsType: '1',
      });
      if (res.status === 200) {
        if (res.result.length === 0) {
          Toast.show('没有搜索到相关内容');
          setIsLoading(false);
          setIsShowCheckList(false);
          setSchoolSearchList([]);
        } else {
          setIsLoading(false);
          setSchoolSearchList(res.result);
          setIsShowCheckList(true);
        }
      }
    } else {
      setIsLoading(false);
      setIsShowCheckList(false);
      setSchoolSearchList([]);
    }
  };

  const getSearchResult = async (value: string) => {
    value && setIsLoading(true);
    load(value);
  };

  const choseAnswer = (value: string[]) => {
    console.log('value: ', value[0]);
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
        onFocus={() => {}}
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
      {isShowCheckList ? (
        <CheckList
          onChange={(val) => {
            choseAnswer(val);
          }}>
          {schoolSearchList.map((item: any) => {
            return (
              <CheckList.Item value={item.name} key={item.id}>
                {item.name}
              </CheckList.Item>
            );
          })}
        </CheckList>
      ) : isLoading ? (
        <div className="flex justify-center mt-4">
          <span style={{ fontSize: 24 }}>
            <DotLoading />
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default GapFill;
