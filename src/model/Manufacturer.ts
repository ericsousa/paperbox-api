import { Address } from "./Address";

export class Manufacturer {
    name: string;
    address: Address;

    constructor(name: string, address: Address) {
        this.name = name;
        this.address = address;
    }
}