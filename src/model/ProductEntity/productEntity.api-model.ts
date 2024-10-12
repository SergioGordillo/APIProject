export interface ProductResponseEntityAPIModel {
    total: number,
    count: 1000,
    products: ProductEntityAPIModel[]
}

export interface ProductEntityAPIModel {
    id: number;     
    name: string;    
    price: number;   
}