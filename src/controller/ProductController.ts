import { Request, Response } from 'express';
import { ProductService } from '../service/ProductService';

const productService = new ProductService();

export function getApiInfo(req: Request, res: Response): void {
    res.status(200).json({
        message: 'Paperbox API is running!',
        version: '1.0.0'
    });
}

export function listProducts(req: Request, res: Response): void {
    const products = productService.listProducts();
    res.status(200).json(products);
}

export function getProductById(req: Request, res: Response): void {
    try {

        const id = parseInt(String(req.params.id));

        const product = productService.getProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        res.status(200).json(product);

    } catch (e: unknown) {
        res.status(404).json({ error: (e as Error).message });
    }
}

export function newProduct(req: Request, res: Response): void {
    try {
        let data: any = req.body;

        const product = productService.newProduct(data);
        res.status(201).json(product);
    } catch (e: unknown) {
        res.status(400).json({ error: (e as Error).message });
    }
}

export function updateProduct(req: Request, res: Response): void {
    try {
        const id = parseInt(String(req.params.id));
        let data: any = req.body;

        const product = productService.updateProduct(id, data);
        if (!product) {
            throw new Error('Product not found');
        }

        res.status(200).json(product);
    } catch (e: unknown) {
        
        if ((e as Error).message === 'Product not found') {
            res.status(404).json({ error: (e as Error).message });
        } else {   
            res.status(400).json({ error: (e as Error).message });
        }
    }
}

export function deleteProduct(req: Request, res: Response): void {
    try {
        const id = parseInt(String(req.params.id));
        const deleted = productService.deleteProduct(id);

        if (!deleted) {
            throw new Error('Product not found');
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e: unknown) {
        res.status(404).json({ error: (e as Error).message });
    }
}
