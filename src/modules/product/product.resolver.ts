import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductDTO } from './dto/product';
import { ProductInputDTO } from './dto/product.input';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => ProductDTO)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query((returns) => [ProductDTO], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productService.findAll();

    const productsToReturn = products.map((product: Product) => {
      const productToReturn = new ProductDTO();

      productToReturn.id = product.id;
      productToReturn.product = product.product;
      productToReturn.price = product.price;

      return productToReturn;
    });

    return productsToReturn;
  }

  @Mutation((returns) => ProductDTO, { name: 'createProduct' })
  async create(@Args('input') input: ProductInputDTO): Promise<Product> {
    return await this.productService.create(input);
  }
}
