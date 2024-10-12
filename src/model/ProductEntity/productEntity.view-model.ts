export interface ProductResponseEntityViewModel {
    total: number,
    count: 1000,
    products: ProductEntityViewModel[]
}

export interface ProductEntityViewModel {
    id: number;     
    name: string;    
    price: number;   
}