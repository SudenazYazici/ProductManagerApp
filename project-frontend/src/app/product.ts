import { ProductCategory } from "./productCategory";

// export interface Product {
//     id: string;
//     name: string;
//     detail: string;
//     price: number ;
//     amount: number;
//     productCategory: ProductCategory;
// }

export class Product {
    id: string | undefined;
    name: string  | undefined;
    detail: string  | undefined;
    price: number   | undefined;
    amount: number  | undefined;
    productCategory: ProductCategory | undefined;
}