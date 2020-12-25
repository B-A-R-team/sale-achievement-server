/**
 * src/service/customer.ts 顾客业务
 * @author 徐梦宇
 */

import {
  DeleteResult,
  getCustomRepository,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { courseService, staffService } from '.';
import createService from '../middleware/createService';
import { Customer } from '../model';
import formatTime from '../util/formatTime';

export interface CustomerDto extends QueryDeepPartialEntity<Customer> {
  staff_id: number;
  course_id: number;
}

export interface ICustomerService {
  getCustomers: () => Promise<Customer[]>;
  getCustomer: (id: number) => Promise<Customer | undefined>;
  addCustomer: (customer: CustomerDto) => Promise<InsertResult>;
}

export default function customerService(): ICustomerService {
  const customerRepository = getRepository(Customer);

  // 注入service
  const injectCourseService = createService(courseService);
  const injectStaffService = createService(staffService);

  return {
    async getCustomers() {
      return await customerRepository.find();
    },
    async getCustomer(id) {
      return await customerRepository.findOne({
        relations: ['staff'],
        where: { id },
      });
    },
    async addCustomer(customer) {
      const { staff_id, course_id } = customer;

      const staff = await injectStaffService().getStaff(staff_id);
      const course = await injectCourseService().getCourse(course_id);

      customer.join_time = formatTime(new Date());
      customer.course = course;
      customer.staff = staff;

      console.dir(customer);

      return await customerRepository.insert(customer);
    },
  };
}
