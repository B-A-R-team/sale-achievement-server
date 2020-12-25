import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Course from './course';
import Staff from './staff';

@Entity()
export default class Customer {
  @PrimaryColumn() id: number;

  @Column() name: string;

  @Column() phone: string;

  @Column() wechat: string;

  @Column() school: string;

  @Column() age: number;

  @Column() grade: string;

  @Column() is_paid: boolean;

  @Column() money: number;

  @Column() join_time: string;

  @ManyToOne((type) => Staff, (staff) => staff.customers)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @ManyToOne((type) => Course, (course) => course.customers)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
