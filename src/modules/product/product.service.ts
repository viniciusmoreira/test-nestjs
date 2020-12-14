import { Inject, Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { MySQLProvider } from '../database/mysql.provider';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@Inject('DATABASE') private readonly mysql: MySQLProvider) {}

  async findAll(): Promise<Product[]> {
    const conn = await this.mysql.getConnection();

    const [results] = await conn.query('select * from products');
    const products: Product[] = Object.assign([], results);

    return products;
  }

  async findById(id: number): Promise<Product> {
    const conn = await this.mysql.getConnection();

    const [result] = await conn.query('select * from products where id = ?', [
      id,
    ]);
    const product: Product = Object.assign({}, result[0]);

    return product;
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const conn = await this.mysql.getConnection();

    const [results] = await conn.query<ResultSetHeader>(
      'insert into products (product, price) values (?, ?)',
      [product.product, product.price],
    );

    return this.findById(results.insertId);
  }

  async remove(id: number): Promise<boolean> {
    const conn = await this.mysql.getConnection();

    const [results] = await conn.query<ResultSetHeader>(
      'delete from products where id = ?',
      [id],
    );

    return results.affectedRows > 0;
  }
}
