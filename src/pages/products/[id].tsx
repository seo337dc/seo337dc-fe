import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Error from '@Components/Error';
import Loading from '@Components/Loading';

import type { NextPage } from 'next';
import type { TProductDetailDto } from '@Type/product';

import { getProductDetail } from '@Controller/index';
import { userAtom } from '@Atom';
import type { TUser, TLoginDto } from '@Type/user';
import { useEffect } from 'react';

const cookies = new Cookies();

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  const [user, setUser] = useRecoilState<TUser | null>(userAtom);

  const { data, isLoading, error } = useQuery<TProductDetailDto>(
    ['getProductDetail', router.query.id],
    () => getProductDetail(Number(router.query.id)),
    {
      enabled: !!router.query.id,
    }
  );

  const handleLogout = () => {
    cookies.remove('user');
    setUser(null);
  };

  useEffect(() => {
    const userInfo = cookies.get('user') as TLoginDto | null | undefined;
    if (userInfo && userInfo.accessToken) {
      setUser(userInfo.user);
    }
  }, [cookies]);

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
      {isLoading && <Loading />}
      {data?.data && !error && (
        <>
          <Thumbnail
            src={
              data.data.product.thumbnail ? data.data.product.thumbnail : '/defaultThumbnail.jpg'
            }
          />
          <ProductInfoWrapper>
            <Name>{data.data.product.name}</Name>
            <Price>{data.data.product.price.toLocaleString()}원</Price>
          </ProductInfoWrapper>
        </>
      )}
      {error && <Error />}
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const LogoutBtn = styled.div`
  cursor: pointer;
`;
