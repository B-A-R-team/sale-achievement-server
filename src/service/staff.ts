import { getRepository } from 'typeorm';
import { Staff } from '../model';

export interface IStaffService {
  getStaffs: () => Promise<Staff[]>;
}

export default function courseService(): IStaffService {
  const staffRepository = getRepository(Staff);
  return {
    async getStaffs() {
      return await staffRepository.find();
    },
  };
}
