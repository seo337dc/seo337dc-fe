import styled from 'styled-components';

const Error = () => {
  return <Wrap>존재하지 않는 페이지입니다.</Wrap>;
};

export default Error;

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
