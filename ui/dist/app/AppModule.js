"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js");
require("reflect-metadata");
//infrastructure
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
//pages
var MasterComponent_1 = require("./components/MasterComponent");
var CartComponent_1 = require("./components/CartComponent");
var CartItemComponent_1 = require("./components/CartItemComponent");
var HomeComponent_1 = require("./components/HomeComponent");
var PageNotFoundComponent_1 = require("./components/PageNotFoundComponent");
//services
var CartService_1 = require("./services/CartService");
var appRoutes = [
    {
        path: 'cart',
        component: CartComponent_1.CartComponent
    },
    {
        path: "404",
        component: PageNotFoundComponent_1.PageNotFoundComponent
    },
    {
        path: '',
        component: HomeComponent_1.HomeComponent
    },
    {
        path: '**',
        redirectTo: "404"
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                )
            ],
            declarations: [
                MasterComponent_1.MasterComponent,
                CartComponent_1.CartComponent,
                CartItemComponent_1.CartItemComponent,
                HomeComponent_1.HomeComponent,
                PageNotFoundComponent_1.PageNotFoundComponent
            ],
            providers: [
                CartService_1.CartService
            ],
            exports: [
                CartItemComponent_1.CartItemComponent
            ],
            bootstrap: [MasterComponent_1.MasterComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
