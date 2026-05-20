import { Product } from '../model/Product';
import { Manufacturer } from '../model/Manufacturer';
import { Address } from '../model/Address';
import { ProductRepository } from '../repository/ProductRepository';

export class ProductService {

    productRepository: ProductRepository = ProductRepository.getInstance();

    listProducts(): Product[] {
        return this.productRepository.filterAllProducts();
    }

    getProductById(id: number): Product | undefined {
        return this.productRepository.filterProductById(id);
    }

    newProduct(data: any): Product {
        this.validateNewProduct(data);

        const product = this.createProduct(
            data.id || this.generateProductId(),
            data
        );

        this.productRepository.insertProduct(product);
        return product;
    }

    updateProduct(id: number, data: any): Product | undefined {
        const existingProduct = this.productRepository.filterProductById(id);
        if (!existingProduct) {
            return undefined;
        }

        this.validateProductData(data);

        const product = this.createProduct(id, data);
        return this.productRepository.updateProduct(id, product);
    }

    deleteProduct(id: number): boolean {
        return this.productRepository.deleteProduct(id);
    }

    private generateProductId(): number {
        const products = this.productRepository.filterAllProducts();
        if (products.length === 0) {
            return 1;
        }

        const ids = products.map(product => product.id);
        const maxId = Math.max(...ids);
        return maxId + 1;
    }

    private validateNewProduct(data: any): void {
        if (data.id !== undefined && data.id <= 0) {
            throw new Error('ID must be a positive number or left blank to auto-generate.');
        }

        const products = this.productRepository.filterAllProducts();
        if (data.id !== undefined && products.some(product => product.id === data.id)) {
            throw new Error('ID already exists. Provide a unique ID or leave it blank to auto-generate.');
        }

        this.validateProductData(data);
    }

    private validateProductData(data: any): void {
        const name = data.name || data.nome;
        const price = data.price || data.preco;
        const manufacturer = data.manufacturer || data.fabricante;
        const address = manufacturer?.address || manufacturer?.endereco;
        const city = address?.city || address?.cidade;
        const country = address?.country || address?.pais;

        if (!name || !price || !manufacturer)
            throw new Error('Product requires name, price and manufacturer');

        if (price <= 0)
            throw new Error('Product price must be greater than zero');

        if (!manufacturer.name && !manufacturer.nome)
            throw new Error('Manufacturer name is required');

        if (!address)
            throw new Error('Manufacturer address is required');

        if (!city)
            throw new Error('Manufacturer city is required');

        if (!country)
            throw new Error('Manufacturer country is required');
    }

    private createProduct(id: number, data: any): Product {
        const manufacturerData = data.manufacturer || data.fabricante;
        const addressData = manufacturerData.address || manufacturerData.endereco;

        const address = new Address(
            addressData.city || addressData.cidade,
            addressData.country || addressData.pais
        );

        const manufacturer = new Manufacturer(
            manufacturerData.name || manufacturerData.nome,
            address
        );

        return new Product(
            id,
            data.name || data.nome,
            data.price || data.preco,
            manufacturer
        );
    }

}
