/**
 * @param {number[]} numsp
 * @return {number}
 */
export const lengthOfLIS = (numsp) => {
  // 每堆的堆顶
  const top = [];
  // 牌堆数初始化为0
  let piles = 0;
  for (let i = 0; i < numsp.length; i++) {
    // 要处理的扑克牌
    let poker = numsp[i];
    // 左堆和最右堆进行二分搜索，因为堆顶是有序排的，最终找到该牌要插入的堆
    let left = 0,
      right = piles;
    //搜索区间是左闭右开
    console.log(left, right, 'first');
    while (left < right) {
      console.log(left, right, 'second');
      let mid = left + Math.floor((right - left) / 2);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    //  当右边的数比，新建一堆
    if (left == piles) piles++;
    // 把这张牌放到堆顶
    top[left] = poker;
  }

  // console.log(top, "top");
  return piles;
};

/**
 * @param {number[]} numsp
 * @return {number}
 */
//  [9, 2, 5, 4, 3, 7]___ [9] [2] [2 5] [2 4] [2 3] [2 3 7 ]
// [0, 1, 0, 3, 2, 3] ____[0] [0,1] []
//  [0, 2, 1, 3, 2, 3] ____[0] [0,2] [0]
// [10, 9, 2, 5, 3, 7, 101, 18] ____[10] [9]
export const selfCheck = (nums) => {
  // let numsp = nums;
  // let numsp = [9, 2, 3, 5, 4, 7];
  // let numsp = [10, 9, 2, 5, 3, 7, 101, 18];
  // let numsp = [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12]; //[2,4,5,6,7,12] 顺序：[3,2]  [5,4]  [6,5] [19,5] [6] [7] [12]
  // [3,5]
  // let numsp = [0, 3, 1, 6, 2, 2, 7];
  // let numsp = [0, 1, 0, 3, 2, 3];
  let numsp = [4, 10, 4, 3, 8, 9];
  // console.log(' [0, 1, 0, 3, 2, 3];: ', [0, 1, 0, 3, 2, 3]);
  //[0],[1,0],[3,2][3]
  //[{value:0,index:0}]
  // [{value:1,index:1},{value:0,index:2}]
  //[{value:3,index:3},{value:2,index:4}]
  // [{value:3,index:5}]
  // [0,1,2,3]
  // let numsp = [0, 2, 1, 3, 2, 3];
  // let numsp = [7, 7, 7, 7, 7, 7, 7];
  // let numsp = [6, 3, 5, 10, 11, 2, 9, 14, 13, 7, 4, 8, 12];
  // [6,3,2] [5,4][10,9,7][11,8][14,13,12]
  //[{value:6,index:0},{value:3,index:1},{value:2,index:5}],
  //[{value:5,index:2},{value:4,index:10}],
  //[{value:10,index:3},{value:9,index:6},{value:7,index:9}],
  //[{value:11,index:4},{value:8,index:11}],
  //[{value:14,index:7},{value:13,index:8},{value:12,index:12}]
  // 每堆的堆顶
  const top = [];
  let totalArray = [];
  for (let i = 0; i < numsp.length; i++) {
    // 要处理的扑克牌
    let poker = numsp[i];
    // 左堆和最右堆进行二分搜索，因为堆顶是有序排的，最终找到该牌要插入的堆
    if (i == 0) {
      totalArray[0] = [{ value: poker, index: 0 }];
    } else {
      // [3], [5], [6] ,poker = 2
      let isFindSuitablePiles = false;
      let suitableIndex = 0;
      totalArray.forEach((item, index) => {
        if (isFindSuitablePiles) return;
        if (item.length > 0) {
          if (item[item.length - 1].value > poker) {
            isFindSuitablePiles = true;
            suitableIndex = index;
          }
        }
      });
      if (isFindSuitablePiles) {
        totalArray[suitableIndex].push({ value: poker, index: i });
      } else {
        totalArray.push([{ value: poker, index: i }]); // 新开一个堆
      }
    }
  }

  // console.log('totalArray: ', totalArray);
  // let preCutIndex = 0;
  // for (let index = totalArray.length - 1; index >= 0; index--) {
  //   if (index == totalArray.length - 1) {
  //     top.push(totalArray[index][totalArray[index].length - 1].value);
  //   }
  //   if (index - 1 >= 0) {
  //     const element = totalArray[index];
  //     const preElement = totalArray[index - 1];
  //     let pass = false;
  //     let cutIndex = preCutIndex;
  //     preCutIndex = 0;
  //     for (
  //       let innerIndex = element.length - 1 - cutIndex;
  //       innerIndex >= 0;
  //       innerIndex--
  //     ) {
  //       const innerElement = element[innerIndex];

  //       for (
  //         let preInnerIndex = preElement.length - 1;
  //         preInnerIndex >= 0;
  //         preInnerIndex--
  //       ) {
  //         const preInnerElement = preElement[preInnerIndex];
  //         if (
  //           innerElement.value > preInnerElement.value &&
  //           innerElement.index > preInnerElement.index
  //         ) {
  //           pass = true;
  //           if (index == totalArray.length - 1) {
  //             top[0] = innerElement.value;
  //           }
  //           top.push(innerElement.value, preInnerElement.value);
  //           console.log('innerElement: ', innerElement, preInnerElement);
  //           break;
  //         } else {
  //           preCutIndex++;
  //         }
  //       }
  //       if (pass) {
  //         break;
  //       }
  //     }
  //     if (pass) {
  //       continue;
  //     }
  //   }
  // }
  console.log(Array.from(new Set(top)), 'top');
  return Array.from(new Set(top)).length;
};

export const selfCheck2 = (nums) => {
  let arr = nums;
  console.log('nums: ', nums);
  let top = [];
  let dp = new Array(arr.length).fill(1);
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let left = 0;
    for (let innerIndex = 0; innerIndex < index; innerIndex++) {
      if (arr[innerIndex] < element) {
        dp[index] = Math.max(dp[index], dp[innerIndex] + 1);
        left = Math.max(left, dp[innerIndex]);
      }
    }
    top[left] = element;
  }
  console.log('top: ', top);
  console.log(dp, 'dp');
  return top.length;
};
