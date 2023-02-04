import { useState } from 'react';

type TProps = {
  data: any[];
  nowPage: number;
};

function usePagination({ data, nowPage }: TProps) {
  const [currentPage, setCurrentPage] = useState(nowPage || 1);
  const [pageList, setPageList] = useState<number[]>([1, 2, 3, 4, 5]);

  const outputItemCount = 10;
  const total = data.length;
  const maxPage = Math.ceil(total / outputItemCount);

  function currentData() {
    const begin = (currentPage - 1) * outputItemCount;
    const end = begin + outputItemCount;
    return data.slice(begin, end);
  }

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

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    maxPage,
    pageList,
    setCurrentPage,
  };
}
export default usePagination;
