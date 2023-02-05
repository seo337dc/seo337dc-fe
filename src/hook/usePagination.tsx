import { useState, useEffect } from 'react';

type TProps = {
  total: number;
  nowPage: number;
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

function usePagination({ nowPage, total }: TProps) {
  const [currentPage, setCurrentPage] = useState(nowPage || 1);

  const [pageList, setPageList] = useState<number[]>([1, 2, 3, 4, 5]);

  const outputItemCount = 10;
  const maxPage = Math.ceil(total / outputItemCount);

  // function currentData() {
  //   const begin = (currentPage - 1) * outputItemCount;
  //   const end = begin + outputItemCount;
  //   return data.slice(begin, end);
  // }

  function next() {
    const result = pageList
      .map((pageData) => pageData + 5)
      .filter((pageData) => pageData <= maxPage);
    setPageList(result);
    setCurrentPage(result[0]);
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
      setCurrentPage(outputPage[0]);
    } else {
      const result = pageList.map((pageData) => pageData - 5);
      setPageList(result);
      setCurrentPage(result[0]);
    }
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  useEffect(() => {
    setPageList(initPageList(nowPage, maxPage));
    setCurrentPage(nowPage);
  }, [maxPage, nowPage]);

  return {
    next,
    prev,
    jump,
    // currentData,
    currentPage,
    maxPage,
    pageList,

    setCurrentPage,
  };
}
export default usePagination;
