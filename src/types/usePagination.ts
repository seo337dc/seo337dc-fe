import { Dispatch, SetStateAction } from 'react';

export type TUsePaginationHook = {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentData: () => any[];
  currentPage: number;
  maxPage: number;
  pageList: number[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
