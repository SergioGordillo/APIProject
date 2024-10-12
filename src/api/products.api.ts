import { ProductEntityAPIModel, ProductResponseEntityAPIModel } from "../model/ProductEntity";

export const getProducts = (minPrice?:number, maxPrice?: number): Promise<ProductResponseEntityAPIModel> => {

    let url = "https://api.ecommerce.com/products";

    const params: string[] = [];

    if (minPrice !== undefined) {
        params.push(`minPrice=${minPrice}`);
      }
    
    if (maxPrice !== undefined) {
        params.push(`maxPrice=${maxPrice}`);
    }

    if (params.length > 0) {
        url += `?${params.join("&")}`;
    }

  return fetch("https://api.ecommerce.com/products")
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("Error obtaining products");
      }

      return response.json();
    })
    .then((data: ProductResponseEntityAPIModel) => {
      return data;
    });
};

const getAllProducts = async (): Promise<ProductEntityAPIModel[]> => {
    let products: ProductEntityAPIModel[] = [];
  
    const fetchProductsInRange = async (minPrice: number, maxPrice: number): Promise<void> => {
      const response = await getProducts(minPrice, maxPrice);
  
      products = products.concat(response.products);
  
      if (response.total > 1000) {
        const midPrice = Math.floor((minPrice + maxPrice) / 2);
  
        await fetchProductsInRange(minPrice, midPrice);  
        await fetchProductsInRange(midPrice + 1, maxPrice); 
      }
    };
  
    await fetchProductsInRange(0, 100000);
  
    return products;
  };


