import { Injectable } from '@angular/core';
import { CartModel } from '../Models/CartModel';

@Injectable()
export class CartService {
    constructor()
    {

    }
    getCart() : CartModel
    {
        var model = new CartModel();
        return model;
    }
    addToCart(request:CartModel) : CartModel
    {
        return request;
    }
    updateCart(request:CartModel) : CartModel
    {
        return request;
    }
}