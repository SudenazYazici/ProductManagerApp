/* export interface ProductCategory {
    id: string;
    name: string;
    categoryId: string;
    productCategory: ProductCategory;
    children: ProductCategory[];
} */

export class ProductCategory {
    id: string | undefined;
    name: string  | undefined;
    categoryId: string  | undefined;
    productCategory: ProductCategory | undefined;
    children: ProductCategory[] | undefined;
}