import { carts } from "../db/carts.db.js";
// import * as crypto from 'crypto';

export class Cart {
    constructor(){
        //this.id = crypto.randomUUID();
        this.id= carts.length +1;
        this.products = [];
        carts.push(this)
    }
};