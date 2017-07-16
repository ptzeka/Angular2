import 'zone.js';
import 'reflect-metadata';

//infrastructure
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//pages
import { MasterComponent } from './components/MasterComponent';
import { CartComponent } from './components/CartComponent';
import { CartItemComponent } from './components/CartItemComponent';
import { HomeComponent } from './components/HomeComponent';
import { PageNotFoundComponent } from './components/PageNotFoundComponent';


//services
import { CartService } from "./services/CartService";


const appRoutes: Routes = [
  { 
    path: 'cart', 
    component: CartComponent 
  },
  {
    path: "404",
    component: PageNotFoundComponent 
  },
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: '**', 
    redirectTo:"404"
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [
    MasterComponent,
    CartComponent,
    CartItemComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [
    CartService
  ],
  exports: [ 
    CartItemComponent
  ],
  bootstrap: [ MasterComponent ]
})
export class AppModule { }