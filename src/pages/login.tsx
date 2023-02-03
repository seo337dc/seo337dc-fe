import Link from 'next/link';

import { useState } from 'react';
import styled from 'styled-components';

import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import type { TLoginInput } from '@Type/login';

const LoginPage: NextPage = () => {
  const [input, setInput] = useState<TLoginInput>({
    id: '',
    pwd: '',
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <TextTitle>아이디</TextTitle>
        <TextInput type='text' value={input.id} name='id' onChange={handleInput} />
        <TextDescript isHidden={true}>올바른 아이디 형식으로 입력해주세요.</TextDescript>

        <br />

        <TextTitle>비밀번호</TextTitle>
        <TextInput type='password' value={input.pwd} name='pwd' onChange={handleInput} />
        <TextDescript isHidden={false}>올바른 비밀번호 형식으로 입력해주세요.</TextDescript>

        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border-radius: 12px;

  &:focus {
    background: #fdedee;
  }
`;

const TextDescript = styled.span<{ isHidden: boolean }>`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
  visibility: ${({ isHidden }) => isHidden && 'hidden'};
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
