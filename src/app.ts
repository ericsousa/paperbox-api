import express, { Request, Response } from 'express';
import { Produto } from './Produto';

const app = express();
const port = process.env.PORT || 3000;
const produtos: Produto[] = [];

app.use(express.json());

app.get('/api/', getApiInfo);
app.get('/api/products', listProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', newProduct);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getApiInfo(req: Request, res: Response): void {
    res.status(200).json({
        message: 'Paperbox API is running!',
        version: '1.0.0'
    });
}

function listProducts(req: Request, res: Response): void {
    res.status(200).json(produtos);
}

function getProductById(req: Request, res: Response): void {
    try {

        const id = parseInt(String(req.params.id));

        const produto = produtos.find(p => p.id === id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        res.status(200).json(produto);

    } catch (e: unknown) {
        res.status(404).json({ error: (e as Error).message });
    }
}

function newProduct(req: Request, res: Response): void {
    try {
        let data: any = req.body;

        if (!data.nome || !data.preco || !data.fabricante) {
            throw new Error('Produto requer nome, preco e fabricante');
        }

        const produto = new Produto(
            data.id,
            data.nome,
            data.preco,
            data.fabricante
        );

        produtos.push(produto);
        res.status(201).json(produto);
    } catch (e: unknown) {
        res.status(400).json({ error: (e as Error).message });
    }
}