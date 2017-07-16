import { Component } from '@angular/core';  
import { CartService } from '../services/CartService';  
import {CartModel} from "../models/CartModel";
@Component({ 
   selector: 'ng-page', 
   styleUrls: ['dist/css/components/CartComponent.css'],
   templateUrl: '/templates/CartComponent.html'
}) 
export class CartComponent { 
    _cartService: CartService
    cart : CartModel
    constructor(cartService: CartService) {
        this._cartService = cartService;
        this.initAsync(); 
    }
    async initAsync() {
        var self = this;
       this._cartService.getCartAsync("empty")
       .then((cart) =>{
           this.cart = cart;
       })
    }
    name = 'World'; 
} 