import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDTO {
  @Field()
  id: number;

  @Field()
  product: string;

  @Field()
  price: number;
}
