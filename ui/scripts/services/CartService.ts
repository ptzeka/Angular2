import { Injectable } from '@angular/core';
import { CartModel } from '../Models/CartModel';
import { CartItemModel } from '../Models/CartItemModel';
import { CartItemPriceModel } from '../Models/CartItemPriceModel';
import { CartItemProductModel } from '../Models/CartItemProductModel';

@Injectable()
export class CartService {
    cart : CartModel 
    constructor()
    {
        
        var cart = new CartModel();
        cart.cartKey = "1";

        const cartItem = new CartItemModel();
        cartItem.itemKey = "1"
        cartItem.quantity = 2;

        const price = new CartItemPriceModel();
        price.unitPrice = 4.99;
        price.unitPriceFormatted = "$4.99"
        price.name = "STD";
        price.extendedPrice = cartItem.quantity * price.unitPrice;
        price.extendedPriceFormatted = "$" + price.extendedPrice;

        const product = new CartItemProductModel();
        product.productCode = "888888"
        product.friendlyName = "iPad mini 4.0";
        product.name = "iPad mini 4.0";
        product.imageUrl = "/img/ipad4mini.jpg";
        product.url = "/products/" + product.productCode;
        
        cartItem.product = product;
        cartItem.price = price;

        cart.items = [cartItem];

        this.cart = cart;
    }
    async getCartAsync(cartKey) : Promise<CartModel>
    {
        return this.cart;
    }
    async addToCartAsync(request:CartModel) : Promise<CartModel>
    {
        return this.cart;
    }
    async updateCartAsync(request:CartModel) : Promise<CartModel>
    {
        return this.cart;
    }
}