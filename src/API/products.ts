import { BASE_URL } from './URL';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  price: number;
  weight: number;
  calories: number;
  category: string;
  shop: string;
  image: string;
}

export async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${BASE_URL}products`).then((data) => data.json());
  return res;
}

export async function getProduct(id: string) {
  const res = await fetch(`${BASE_URL}products/${id}`).then((data) => data.json());
  return res;
}
