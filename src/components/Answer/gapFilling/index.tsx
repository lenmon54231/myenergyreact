import { SearchBar, Toast, CheckList, DotLoading } from 'antd-mobile';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { useRef, useContext, useState, useCallback, useEffect } from 'react';
import { InitContext } from '@/pages/AnswerPage/index';
import { getSchoolListByKeyWord } from '@/api/answer/index';
import debounce from 'lodash/debounce';
import { saveResult } from '../useData/index';

const GapFill = () => {
  const { result, setResult, currentQuestion, setIsSubmitButtonDisabled } =
    useContext(InitContext);

  const searchRef = useRef<SearchBarRef>(null);
  const [isShowCheckList, setIsShowCheckList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schoolSearchList, setSchoolSearchList] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState('');

  useEffect(() => {
    setSearchBarValue(
      result[currentQuestion?.questionNum - 1]?.result &&
        JSON.parse(result[currentQuestion?.questionNum - 1]?.result)?.name,
    );
  }, [currentQuestion?.questionNum]);

  const initSearchList = () => {
    setIsLoading(false);
    setIsShowCheckList(false);
    setSchoolSearchList([]);
  };
  const load = useCallback(
    debounce((p) => updateSearchList(p), 800),
    [],
  );
  const updateSearchList = async (value) => {
    if (value) {
      const res = await getSchoolListByKeyWord({
        id: currentQuestion?.options[0]?.id,
        key: value,
        optionsType: '1',
      });
      if (res.status === 200) {
        if (res.result.length === 0) {
          Toast.show('没有搜索到相关内容');
          initSearchList();
        } else {
          setIsLoading(false);
          setSchoolSearchList(res.result);
          setIsShowCheckList(true);
        }
      }
    } else {
      initSearchList();
    }
  };

  const getSearchResult = async (value) => {
    value && setIsLoading(true);
    load(value);
  };

  const choseAnswer = (value) => {
    console.log('value: ', currentQuestion, value);
    saveResult(value, result, setResult, currentQuestion);
    setSearchBarValue(value[0].name);
    setIsSubmitButtonDisabled(false);
    setTimeout(() => {
      initSearchList();
    }, 300);
  };

  return (
    <div>
      <SearchBar
        value={searchBarValue}
        ref={searchRef}
        placeholder="请输入内容"
        style={{ '--background': '#ffffff' }}
        showCancelButton
        onChange={(val) => {
          console.log('val: ', val);
          setSearchBarValue(val);
          setIsSubmitButtonDisabled(true);
          getSearchResult(val);
        }}
      />
      {isShowCheckList ? (
        <CheckList
          onChange={(val) => {
            choseAnswer(val);
          }}>
          {schoolSearchList.map((item) => {
            return (
              <CheckList.Item value={item} key={item.id}>
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
