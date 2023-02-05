import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import usePagination from '@Hook/usePagination';

import ProductList from '@Components/ProductList';
import Pagination from '@Components/Pagination';
import Error from '@Components/Error';

import { userAtom } from '@Atom';
import { getUserInfo, getProductList } from '@Controller/index';

import type { NextPage } from 'next';
import type { AxiosResponse } from 'axios';
import type { TLoginDto, TUser, TUserDto } from '@Type/user';
import { TProductDto } from '@Type/product';

const cookies = new Cookies();

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const userInfo = cookies.get('user') as TLoginDto | null | undefined;

  const [nowPage, setNowPage] = useState<number>(Number(page));

  const [user, setUser] = useRecoilState<TUser | null>(userAtom);

  useQuery(['getUserInfo'], () => getUserInfo(userInfo?.user.id || ''), {
    enabled: !!userInfo?.accessToken,
    onSuccess: (result: AxiosResponse<TUserDto>) => {
      if (result.status === 200) {
        setUser(result.data.data.user);
      }
    },
  });

  const { data } = useQuery<TProductDto>(
    ['getProductList', nowPage],
    () => getProductList(nowPage),
    {}
  );

  const pagenation = usePagination({
    total: data?.data.totalCount || 0,
    nowPage,
  });

  const handleLogout = () => {
    cookies.remove('user');
    setUser(null);
  };

  useEffect(() => {
    if (page) setNowPage(Number(page));
  }, [page]);

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
        {data?.data ? (
          <>
            <ProductList products={data.data.products} />
            <Pagination
              pageList={pagenation.pageList}
              nowPage={nowPage}
              setNowPage={setNowPage}
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
