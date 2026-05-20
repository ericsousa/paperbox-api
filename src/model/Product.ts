import { Manufacturer } from "./Manufacturer";

export class Product {
    id: number;
    name: string;
    price: number;
    manufacturer: Manufacturer;

    constructor(id: number, name: string, price: number, manufacturer: Manufacturer) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.manufacturer = manufacturer;
    }
}   
