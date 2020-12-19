import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import Customer from './customer';

@Entity()
export default class Course {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() teacher: string;

  @Column() price: number;

  @Column() is_stop: boolean;

  @OneToMany((type) => Customer, (customer) => customer.course)
  customers: Customer[];
}
