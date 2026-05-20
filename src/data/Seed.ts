import { ProductService } from '../service/ProductService';

const productService = new ProductService();

export function seedProducts(): void {
    productService.newProduct({
        id: 1,
        name: 'Caderno universitario 10 materias',
        price: 24.90,
        manufacturer: {
            name: 'Tilibra',
            address: {
                city: 'Bauru',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 2,
        name: 'Caneta esferografica azul',
        price: 2.50,
        manufacturer: {
            name: 'BIC',
            address: {
                city: 'Manaus',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 3,
        name: 'Lapis preto HB',
        price: 1.50,
        manufacturer: {
            name: 'Faber-Castell',
            address: {
                city: 'Sao Carlos',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 4,
        name: 'Borracha branca',
        price: 2.25,
        manufacturer: {
            name: 'Mercur',
            address: {
                city: 'Santa Cruz do Sul',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 5,
        name: 'Apontador com deposito',
        price: 4.90,
        manufacturer: {
            name: 'Faber-Castell',
            address: {
                city: 'Sao Carlos',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 6,
        name: 'Marca-texto amarelo',
        price: 6.50,
        manufacturer: {
            name: 'Stabilo',
            address: {
                city: 'Heroldsberg',
                country: 'Alemanha'
            }
        }
    });

    productService.newProduct({
        id: 7,
        name: 'Corretivo liquido',
        price: 5.90,
        manufacturer: {
            name: 'BIC',
            address: {
                city: 'Manaus',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 8,
        name: 'Cola branca escolar',
        price: 4.75,
        manufacturer: {
            name: 'Pritt',
            address: {
                city: 'Sao Paulo',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 9,
        name: 'Tesoura escolar sem ponta',
        price: 8.90,
        manufacturer: {
            name: 'Tris',
            address: {
                city: 'Dois Irmaos',
                country: 'Brasil'
            }
        }
    });

    productService.newProduct({
        id: 10,
        name: 'Papel sulfite A4 500 folhas',
        price: 32.90,
        manufacturer: {
            name: 'Chamex',
            address: {
                city: 'Mogi Guacu',
                country: 'Brasil'
            }
        }
    });
}
