import express from 'express';

import { seedProducts } from './data/Seed';
import { 
    getApiInfo,
    listProducts,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
} from './controller/ProductController';

const app = express();
const port = process.env.PORT || 3000;

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

