import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type TProps = {
  pageList: number[];
  nowPage: number;
  setNowPage: Dispatch<SetStateAction<number>>;
  next: () => void;
  prev: () => void;
};
const Pagination = ({ pageList, nowPage, setNowPage, next, prev }: TProps) => {
  return (
    <Container>
      <Button disabled={pageList[0] === 1}>
        <VscChevronLeft onClick={prev} />
      </Button>
      <PageWrapper>
        {pageList.map((page) => (
          <Page
            key={page}
            selected={page === nowPage}
            disabled={page === nowPage}
            onClick={() => setNowPage(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={false}>
        <VscChevronRight onClick={next} />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
