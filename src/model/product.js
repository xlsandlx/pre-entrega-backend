import { products } from "../db/products.db.js";

export class Product {
    constructor(title, description, code, price, stock, category, thumbnail){
        this.title = title ;
        this.description = description;
        this.code = code;
        this.price= price;
        this.status= true;
        this.stock= stock;
        this.category= category;
        this.thumbnail= thumbnail;
        products.push(this)
        this.id = products.length;
    }
};