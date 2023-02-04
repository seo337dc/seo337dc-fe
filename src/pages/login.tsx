import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import { AxiosResponse } from 'axios';

import type { NextPage, NextApiResponse } from 'next';
import type { ChangeEvent, FocusEvent } from 'react';

import { loginFn } from '@Controller';
import { TResData } from '@Type/user';

const iDPattern = new RegExp('^[0-9|a-z|A-Z]{4,29}$');
const pwdPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,29}$');

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['user']);

  const loginMutate = useMutation({
    mutationFn: loginFn,
    onSuccess: (result: AxiosResponse<TResData>) => {
      if (result.status === 200) {
        const { data } = result.data;
        setCookie('user', data); // 쿠키에 토큰 저장
        router.push('/');
      }
    },
  });
  const [input, setInput] = useState({
    id: '',
    pwd: '',
  });

  const [activeDesc, setActiveDesc] = useState({
    id: true,
    pwd: true,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    if (e.target.name === 'id' && iDPattern.test(e.target.value) && !activeDesc.id) {
      setActiveDesc({ ...activeDesc, id: true });
    }

    if (e.target.name === 'pwd' && pwdPattern.test(e.target.value) && !activeDesc.pwd) {
      setActiveDesc({ ...activeDesc, pwd: true });
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.name === 'id') {
      if (!iDPattern.test(input.id)) {
        setActiveDesc({ ...activeDesc, id: false });
      }
    }

    if (e.target.name === 'pwd') {
      if (!pwdPattern.test(input.pwd)) {
        setActiveDesc({ ...activeDesc, pwd: false });
      }
    }
  };

  const isAbleLogin = useMemo(() => {
    if (!input.id || !input.pwd) return false;
    if (!iDPattern.test(input.id) || !pwdPattern.test(input.pwd)) return false;
    if (activeDesc.id && activeDesc.pwd) return true;
    return false;
  }, [activeDesc, input]);

  useEffect(() => {
    if (cookies.user) router.push('/');
  }, [cookies.user, router]);

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
        <TextInput
          type='text'
          name='id'
          value={input.id}
          onChange={handleInput}
          onBlur={handleBlur}
        />
        <TextDescript isHidden={activeDesc.id}>올바른 아이디 형식으로 입력해주세요.</TextDescript>

        <br />

        <TextTitle>비밀번호</TextTitle>
        <TextInput
          name='pwd'
          type='password'
          value={input.pwd}
          onChange={handleInput}
          onBlur={handleBlur}
        />
        <TextDescript isHidden={activeDesc.pwd}>
          올바른 비밀번호 형식으로 입력해주세요.
        </TextDescript>

        <LoginButton disabled={!isAbleLogin} onClick={() => loginMutate.mutate()}>
          로그인
        </LoginButton>
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
