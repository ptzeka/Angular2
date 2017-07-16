import {CartItemPriceModel} from "./CartItemPriceModel";
import {CartItemProductModel} from "./CartItemProductModel";

export class CartItemModel
{
    quantity: number
    itemKey: string
    price: CartItemPriceModel
    product: CartItemProductModel
}