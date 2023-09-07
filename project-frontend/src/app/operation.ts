import { CashRegister } from "./cashregister";
import { Product } from "./product";

export interface Operation {
    id: string;
    product: Product;
    type: string;
    date: Date;
    amount: number;
    cashRegister: CashRegister;
}