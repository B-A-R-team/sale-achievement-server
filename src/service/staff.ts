/**
 * src/service/staff.ts 员工业务
 * @author 徐梦宇
 */

import { getRepository, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Staff } from '../model';
import crypto from 'crypto';
import { DEFAULT_PASSWORD } from '../util/constant';
import generateToken from '../util/generateToken';

export interface IStaffService {
  getStaffs: () => Promise<Staff[]>;
  getStaff: (id: number) => Promise<Staff | undefined>;
  getStaffByOpenid: (
    openid: string
  ) => Promise<{ staff: Staff; token: string } | null>;
  getStaffTotal: () => Promise<number>;
  addStaff: (staff: QueryDeepPartialEntity<Staff>) => Promise<InsertResult>;
  updateStaff: (
    id: number,
    staff: QueryDeepPartialEntity<Staff>
  ) => Promise<UpdateResult>;
  registerInWeb: (name: string) => Promise<InsertResult>;
  registerInWx: (
    openid: string,
    nickname: string,
    avatar_url: string,
    staff_id: string
  ) => Promise<{ staff: Staff; token: string } | null>;
}

export default function courseService(): IStaffService {
  const staffRepository = getRepository(Staff);
  return {
    async getStaffs() {
      return await staffRepository.find();
    },
    async getStaff(id) {
      return await staffRepository.findOne(id);
    },
    async getStaffByOpenid(openid) {
      const staff = await staffRepository.findOne({ openid });
      if (staff) {
        const token = generateToken(staff.id + '');
        return {
          staff,
          token,
        };
      }
      return null;
    },
    async getStaffTotal() {
      return await staffRepository.count();
    },
    async addStaff(staff) {
      return await staffRepository.insert(staff);
    },
    async updateStaff(id, staff) {
      return await staffRepository.update(id, staff);
    },
    async registerInWeb(name) {
      // 生成工号
      const year = new Date().getFullYear() + '';
      const count = (await this.getStaffTotal()) + '';
      const id = +(year + count.padStart(5, '0'));

      // 默认密码
      const password = crypto
        .createHash('md5')
        .update(DEFAULT_PASSWORD, 'utf-8')
        .digest('hex');

      return await staffRepository.insert({ id, name, password });
    },
    async registerInWx(openid, nickname, avatar_url, staff_id) {
      const staff = await this.getStaff(+staff_id);
      if (staff) {
        staff.avatar_url = avatar_url;
        staff.nickname = nickname;
        staff.openid = openid;

        await this.updateStaff(+staff_id, staff);

        const token = generateToken(staff_id);
        return {
          staff,
          token,
        };
      }
      return null;
    },
  };
}
