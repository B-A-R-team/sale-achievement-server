import {
  DeleteResult,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Course } from '../model';

export interface ICourseService {
  getCourses: () => Promise<Course[]>;
  getCourse: (id: number) => Promise<Course | undefined>;
  addCourse: (course: QueryDeepPartialEntity<Course>) => Promise<InsertResult>;
  updateCourse: (
    id: number,
    course: QueryDeepPartialEntity<Course>
  ) => Promise<UpdateResult>;
  deleteCourse: (id: number) => Promise<DeleteResult>;
}

export default function courseService(): ICourseService {
  const courseRepository = getRepository(Course);
  return {
    async getCourses() {
      return await courseRepository.find();
    },
    async getCourse(id) {
      return await courseRepository.findOne(id);
    },
    async addCourse(course) {
      return await courseRepository.insert(course);
    },
    async updateCourse(id, course) {
      return await courseRepository.update(id, course);
    },
    async deleteCourse(id) {
      return await courseRepository.delete(id);
    },
  };
}
