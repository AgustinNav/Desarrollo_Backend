import mongoose, { Schema } from 'mongoose';

const collectionName = 'courses';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const arrayTypeSchemaNonUniqueRequired = {
    type: Array,
    required: true
};

// Implementar el SCHEMA que usa el Model para Mongoose

// title: type string
// description: tipo string
// teacherName: type number
// students: type array

const courseSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    teacherName: stringTypeSchemaNonUniqueRequired,
    students: arrayTypeSchemaNonUniqueRequired
})

// Aqui Implementar el Modelo

const coursesModel = mongoose.model(collectionName, courseSchema)

export default coursesModel