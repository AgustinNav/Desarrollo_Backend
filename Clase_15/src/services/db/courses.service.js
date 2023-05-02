import coursesModel from "./models/courses.js";

export default class CourseService {
    constructor() {
        console.log("CourseService - Working courses with Database persistence in mongodb");
    }

    getAll = async () => {
        try {
            let courses = await coursesModel.find();
            return courses.map(course => course.toObject());
        } catch (error) {
            throw (error)
        }
    }

    save = async (course) => {
        try {
            let result = await coursesModel.create(course);
            return result;
        } catch (error) {
            throw (error)
        }
    }

    deleteById = async (courseId) => {
        try {
            await coursesModel.deleteOne({ _id: courseId });
            return courseId
        } catch (error) {
            throw (error)
        }
    }

    updateById = async (courseUpdated) => {
        try {
            let { id, ...rest } = courseUpdated  // Se desestructura ID y el resto de propiedades quedan en REST
            await coursesModel.updateOne({ _id: id }, rest);
            return courseUpdated
        } catch (error) {
            throw (error)
        }
    }

}
