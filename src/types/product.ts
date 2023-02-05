export type Product = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
};

export type TProductDto = {
  data: {
    products: Product[];
    totalCount: number;
  };
};
