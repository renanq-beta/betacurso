import { getRepository, Repository } from "typeorm";
import { ICourse, ICourses } from "../interfaces/ICourses";
import CoursesModel from "../models/Courses";

class CourseController {

  private get repository(): Repository<CoursesModel> {
    return getRepository(CoursesModel);
  };

  create = async (course: ICourse): Promise<ICourse> => {
    const courseToCreate = this.repository.create({
      name: course.name,
      description: course.description,
      duration: course.duration,
      video: course.video,
      views: course.views,
    });
    await this.repository.save(courseToCreate);

    return {
      ...courseToCreate as ICourse
    };

  }

  getAllCourses = async(filter: ICourse): Promise<ICourses> => {
    const getCourses = await this.repository.find({ where: { ...filter } });
    return {
      total_count: getCourses.length,
      edges: getCourses,
    }
  }

}

export default new CourseController();