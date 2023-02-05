import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import usePagination from '@Hook/usePagination';

import products from '@Api/data/products.json';
import ProductList from '@Components/ProductList';
import Pagination from '@Components/Pagination';
import Error from '@Components/Error';

import { userAtom } from '@Atom';
import { getUserInfo } from '@Controller/index';

import type { NextPage } from 'next';
import type { AxiosResponse } from 'axios';
import type { TLoginDto, TUser, TUserDto } from '@Type/user';

const cookies = new Cookies();

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const userInfo = cookies.get('user') as TLoginDto | null | undefined;

  const [user, setUser] = useRecoilState<TUser | null>(userAtom);

  useQuery(['getUserInfo'], () => getUserInfo(userInfo?.user.id || ''), {
    enabled: !!userInfo?.accessToken,
    onSuccess: (result: AxiosResponse<TUserDto>) => {
      if (result.status === 200) {
        setUser(result.data.data.user);
      }
    },
  });

  const pagenation = usePagination({
    data: products,
    nowPage: Number(page) || 1,
  });

  const handleLogout = () => {
    cookies.remove('user');
    setUser(null);
  };

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
        {pagenation.currentData().length > 0 ? (
          <>
            <ProductList products={pagenation.currentData()} />
            <Pagination
              pageList={pagenation.pageList}
              nowPage={pagenation.currentPage}
              setNowPage={pagenation.setCurrentPage}
              next={pagenation.next}
              prev={pagenation.prev}
            />{' '}
          </>
        ) : (
          <Error />
        )}
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
