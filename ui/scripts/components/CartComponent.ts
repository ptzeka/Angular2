import { Component } from '@angular/core';  
import { CartService } from '../services/CartService';  
import { CartModel } from "../models/CartModel";
import { CartItemModel } from "../models/CartItemModel";

@Component({ 
   selector: 'ng-page', 
   styleUrls: ['dist/css/components/CartComponent.css'],
   templateUrl: '/templates/CartComponent.html'
}) 
export class CartComponent { 
    _cartService: CartService
    cart : CartModel
    submitType: String
    constructor(cartService: CartService) {
        this._cartService = cartService;
        this.submitType = "";
        this.initAsync(); 
    }
    async initAsync() {
        var self = this;
       this._cartService.getCartAsync("empty")
       .then((cart: CartModel) =>{
           this.cart = cart;
       })
    }
    setSubmitType(value: String)
    {
        console.log(this);
        this.submitType = value;
    }
    onSubmit(event)
    {
        console.log(this);
    }
    update(item : CartItemModel)
    {
        const model = new CartModel();
        model.cartKey = this.cart.cartKey;
        model.items = [item];
        this._cartService.updateCartAsync(model)
        .then((cart: CartModel)=>{
            this.cart = cart;
        });
    }
} 