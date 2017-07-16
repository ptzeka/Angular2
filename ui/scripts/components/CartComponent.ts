import { Component } from '@angular/core';  
import { CartService } from '../services/CartService';  

@Component({ 
   selector: 'ng-page', 
   styleUrls: ['dist/css/components/CartComponent.css'],
   templateUrl: '/templates/CartComponent.html'
}) 
export class CartComponent { 
    constructor(cartService: CartService) {

    }
    name = 'World'; 
} 