import { Component, Input } from '@angular/core';  

import {CartItemModel} from '../models/CartItemModel';

@Component({ 
   selector: 'cart-item', 
   styleUrls: ['dist/css/components/CartItemComponent.css'],
   templateUrl: '/templates/CartItemComponent.html'
})  
export class CartItemComponent { 
    @Input()
    public item: CartItemModel
    @Input()
    public setSubmitType: Function
    constructor() {
        
    }
} 