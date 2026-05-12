import express, { Request, Response } from 'express';
import { Produto } from './Produto';

const app = express();
const port = process.env.PORT || 3000;
const produtos: Produto[] = [];

app.use(express.json());

app.get('/api/', getApiInfo);
app.get('/api/produtos', listarProdutos);
app.post('/api/produtos', novoProduto);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getApiInfo(req: Request, res: Response): void {
    res.status(200).json({
        message: 'Paperbox API is running!',
        version: '1.0.0'
    });
}

function listarProdutos(req: Request, res: Response): void {
    res.status(200).json(produtos);
}

function novoProduto(req: Request, res: Response): void {
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