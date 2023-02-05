import styled from 'styled-components';

const Loading = () => {
  return <Wrap>데이터를 조회하고 있습니다.</Wrap>;
};

export default Loading;

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
