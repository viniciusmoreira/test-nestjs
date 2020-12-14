import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

interface ResponseDTO {
  success: boolean;
  message: string;
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Post()
  async create(@Body() product: Omit<Product, 'id'>): Promise<Product> {
    return await this.productService.create(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDTO> {
    const success = await this.productService.remove(id);
    return {
      success,
      message: success
        ? 'Removed with success'
        : 'Problems when try to remove register',
    };
  }
}
