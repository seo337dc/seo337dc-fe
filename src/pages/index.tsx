import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

import { userAtom } from '@Atom';

import type { NextPage, NextPageContext } from 'next';
import type { TLoginDto, TUser } from '@Type/user';

const cookies = new Cookies();

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const [user, setUser] = useRecoilState<TUser | null>(userAtom);

  const handleLogout = () => {
    cookies.remove('user');
    setUser(null);
  };

  useEffect(() => {
    if (cookies && cookies.get('user')) {
      const userInfo = cookies.get('user') as TLoginDto;
      setUser(userInfo.user);
    }
  }, [setUser]);

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {user ? (
          <div>
            <p>{user.name}</p>
            <LogoutBtn onClick={handleLogout}>logout</LogoutBtn>
          </div>
        ) : (
          <Link href='/login'>
            <p>login</p>
          </Link>
        )}
      </Header>
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination />
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const LogoutBtn = styled.div`
  cursor: pointer;
`;
