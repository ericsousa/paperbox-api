import { Product } from '../model/Product';

// Singleton Repository
export class ProductRepository {
    private static instance: ProductRepository;
    private products: Product[] = [];

    private constructor() {}

    public static getInstance(): ProductRepository {
        if (!this.instance) {
            this.instance = new ProductRepository();
        }
        return this.instance;
    }

    filterAllProducts(): Product[] {
        return this.products;
    }   

    filterProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }   

    insertProduct(product: Product): void {
        this.products.push(product);
    }

    updateProduct(id: number, product: Product): Product | undefined {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return undefined;
        }
        this.products[productIndex] = product;
        return product;
    }

    deleteProduct(id: number): boolean {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return false;
        }
        this.products.splice(productIndex, 1);
        return true;
    }
}
