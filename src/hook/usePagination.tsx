import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type TProps = {
  total: number;
  nowPage: number;
  setNowPage: Dispatch<SetStateAction<number>>;
};

const initPageList = (nowPage: number, maxPage: number) => {
  if (nowPage < 6) return [1, 2, 3, 4, 5];

  const startPage = Math.floor(nowPage / 5) * 5;
  let output = [];
  for (let i = 0; i < 5; i++) {
    output.push(startPage + i + 1);
  }

  if (nowPage >= maxPage) {
    return output.filter((page) => page <= maxPage);
  }

  return output;
};

function usePagination({ nowPage, total, setNowPage }: TProps) {
  const [pageList, setPageList] = useState<number[]>([1, 2, 3, 4, 5]);

  const outputItemCount = 10;
  const maxPage = Math.ceil(total / outputItemCount);

  function next() {
    const result = pageList
      .map((pageData) => pageData + 5)
      .filter((pageData) => pageData <= maxPage);
    setPageList(result);
    setNowPage(result[0]);
  }

  function prev() {
    if (pageList[pageList.length - 1] === maxPage) {
      const lastPage = pageList[pageList.length - 1];
      const lastPrevPageNum = Math.floor(lastPage / 5) * 5;

      let outputPage = [];
      for (let i = 5; i > 0; i--) {
        outputPage.push(lastPrevPageNum - i + 1);
      }
      setPageList(outputPage);
      setNowPage(outputPage[0]);
    } else {
      const result = pageList.map((pageData) => pageData - 5);
      setPageList(result);
      setNowPage(result[0]);
    }
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setNowPage(Math.min(pageNumber, maxPage));
  }

  useEffect(() => {
    setPageList(initPageList(nowPage, maxPage));
    setNowPage(nowPage);
  }, [nowPage, maxPage]);

  return {
    next,
    prev,
    jump,
    pageList,
  };
}
export default usePagination;
