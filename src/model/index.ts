import Course from './course';
import Staff from './staff';
import Customer from './customer';
import { createConnection, getConnection } from 'typeorm';

export { Course, Staff, Customer };

export default async function connectDb() {
  const connection = await createConnection('default');
  connection.isConnected && console.log('=>>> 数据库连接成功 <<<=');
}
