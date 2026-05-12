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
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.listen(port, () => {
    if ( process.env.SEED === 'true' ) {
        seedProducts();
    }
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

function generateProductId(): number {
    if (produtos.length === 0) {
        return 1;
    }
    const ids = produtos.map(p => p.id); // Extracts the IDs of existing products
    const maxId = Math.max(...ids); // Find the maximum ID
    return maxId + 1; // Return the next ID
}

function validateProductData(data: any): void {
    
    if (!data.nome || !data.preco || !data.fabricante)  
        throw new Error('Produto requer nome, preco e fabricante');

    if (data.preco <= 0)    
        throw new Error('Preço do produto deve ser maior que zero');

    if (!data.fabricante.nome)  
        throw new Error('Nome do fabricante é obrigatório');

    if (!data.fabricante.endereco)  
        throw new Error('Endereço do fabricante é obrigatório');

    if (!data.fabricante.endereco.cidade)   
        throw new Error('Cidade do fabricante é obrigatória');

    if (!data.fabricante.endereco.pais)     
        throw new Error('País do fabricante é obrigatório');

}

function newProduct(req: Request, res: Response): void {
    try {
        let data: any = req.body;

        // Validate the provided ID is a positive number if it exists
        if (data.id !== undefined && data.id <= 0) {
            throw new Error('ID deve ser um número positivo ou deixado em branco para auto-gerar.');
        }

        // Check if the provided ID already exists in the products array
        if (data.id !== undefined && produtos.some(p => p.id === data.id)) {
            throw new Error('ID já existe. Por favor, forneça um ID único ou deixe em branco para auto-gerar.');
        }

        validateProductData(data);

        const produto = new Produto(
            data.id || generateProductId(),
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

function updateProduct(req: Request, res: Response): void {
    try {
        const id = parseInt(String(req.params.id));
        let data: any = req.body;
        const produtoIndex = produtos.findIndex(p => p.id === id);

        if (produtoIndex === -1) {
            throw new Error('Produto não encontrado');
        }

        validateProductData(data);

        const produto = new Produto(
            id,
            data.nome,
            data.preco,
            data.fabricante
        );

        produtos[produtoIndex] = produto;
        res.status(200).json(produto);
    } catch (e: unknown) {
        
        if ((e as Error).message === 'Produto não encontrado') {
            res.status(404).json({ error: (e as Error).message });
        } else {   
            res.status(400).json({ error: (e as Error).message });
        }
    }
}

function deleteProduct(req: Request, res: Response): void {
    try {
        const id = parseInt(String(req.params.id));
        const produtoIndex = produtos.findIndex(p => p.id === id);

        if (produtoIndex === -1) {
            throw new Error('Produto não encontrado');
        }

        produtos.splice(produtoIndex, 1);

        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (e: unknown) {
        res.status(404).json({ error: (e as Error).message });
    }
}

function seedProducts(): void {
    produtos.push(
        new Produto(1, 'Caderno universitario 10 materias', 24.90, {
            nome: 'Tilibra',
            endereco: {
                cidade: 'Bauru',
                pais: 'Brasil'
            }
        }),
        new Produto(2, 'Caneta esferografica azul', 2.50, {
            nome: 'BIC',
            endereco: {
                cidade: 'Manaus',
                pais: 'Brasil'
            }
        }),
        new Produto(3, 'Lapis preto HB', 1.50, {
            nome: 'Faber-Castell',
            endereco: {
                cidade: 'Sao Carlos',
                pais: 'Brasil'
            }
        }),
        new Produto(4, 'Borracha branca', 2.25, {
            nome: 'Mercur',
            endereco: {
                cidade: 'Santa Cruz do Sul',
                pais: 'Brasil'
            }
        }),
        new Produto(5, 'Apontador com deposito', 4.90, {
            nome: 'Faber-Castell',
            endereco: {
                cidade: 'Sao Carlos',
                pais: 'Brasil'
            }
        }),
        new Produto(6, 'Marca-texto amarelo', 6.50, {
            nome: 'Stabilo',
            endereco: {
                cidade: 'Heroldsberg',
                pais: 'Alemanha'
            }
        }),
        new Produto(7, 'Corretivo liquido', 5.90, {
            nome: 'BIC',
            endereco: {
                cidade: 'Manaus',
                pais: 'Brasil'
            }
        }),
        new Produto(8, 'Cola branca escolar', 4.75, {
            nome: 'Pritt',
            endereco: {
                cidade: 'Sao Paulo',
                pais: 'Brasil'
            }
        }),
        new Produto(9, 'Tesoura escolar sem ponta', 8.90, {
            nome: 'Tris',
            endereco: {
                cidade: 'Dois Irmaos',
                pais: 'Brasil'
            }
        }),
        new Produto(10, 'Papel sulfite A4 500 folhas', 32.90, {
            nome: 'Chamex',
            endereco: {
                cidade: 'Mogi Guacu',
                pais: 'Brasil'
            }
        })
    );
}
