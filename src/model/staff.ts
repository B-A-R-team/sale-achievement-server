import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Customer from './customer';

@Entity()
export default class Staff {
  @PrimaryColumn() id: number;

  @Column() name: string;

  @Column() nickname: string;

  @Column() avatar_url: string;

  @Column() openid: string;

  @Column() password: string;

  @OneToMany((type) => Customer, (customer) => customer.staff)
  customers: Customer[];
}
