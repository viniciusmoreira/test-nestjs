import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInputDTO {
  @Field({ nullable: true })
  id: number;

  @Field()
  product: string;

  @Field()
  price: number;
}
