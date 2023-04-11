import studentsModel from "./models/students.js";

export default class StudentService {
    constructor() {
        console.log("StudentService - Working students with Database persistence in mongodb -");
    }

    getAll = async () => {
        try {
            let students = await studentsModel.find();
            return students.map(student => student.toObject());
        } catch (error) {
            throw (error)
        }
    }

    deleteById = async (studentId) => {
        try {
            await studentsModel.deleteOne({_id: studentId});
            return studentId
        } catch (error) {
            throw (error)
        }
    }

    updateById = async (studentUpdated) => {
        try {
            let { id, ...rest } = studentUpdated  // Se desestructura ID y el resto de propiedades quedan en REST
            await studentsModel.updateOne({_id: id}, rest);
            return studentUpdated
        } catch (error) {
            throw (error)
        }
    }

    save = async (student) => {
        try {
            let result = await studentsModel.create(student);
            return result;
        } catch (error) {
            throw (error)
        }
    }
}

