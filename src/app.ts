import express, { Request, Response } from 'express';
import { Produto } from './Produto';

const app = express();
const port = process.env.PORT || 3000;
const produtos: Produto[] = [];


// Test product data
produtos.push({
    id: 1,
    nome: 'Caderno A5',
    preco: 15.99,
    fabricante: {
        nome: 'Paperbox',
        endereco: {
            cidade: 'Sao Paulo',
            pais: 'Brasil'
        }
    }
});

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
         message: 'Paperbox API is running!',
         version: '1.0.0'
    });
});

app.get('/produtos', (req: Request, res: Response): void => {
    res.status(200).json(produtos);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});