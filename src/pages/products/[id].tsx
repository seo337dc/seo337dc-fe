import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Error from '@Components/Error';

import type { NextPage } from 'next';
import type { Product } from '@Type/product';

import products from '@Api/data/products.json';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    if (router.query.id) {
      const findPrd = products.find((prd) => prd.id === router.query.id);
      if (findPrd) setProductData(findPrd);
    }
  }, [router.query.id]);

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
      {productData ? (
        <>
          <Thumbnail
            src={productData.thumbnail ? productData.thumbnail : '/defaultThumbnail.jpg'}
          />
          <ProductInfoWrapper>
            <Name>{productData.name}</Name>
            <Price>{productData.price.toLocaleString()}원</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <Error />
      )}
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
