import mongoose from 'mongoose';

const collectionName = 'students';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};


// Implementar SCHEMAS para el Model de Mongoose

// name: type string
// lastName: tipo string
// age: type number
// id: type string (campo único)
// courses: type array

const studentSchema = new mongoose.Schema({
    name: stringTypeSchemaNonUniqueRequired,
    lastName: stringTypeSchemaNonUniqueRequired,
    age: numberTypeSchemaNonUniqueRequired,
    courses: {
        type: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "courses"
                }
            }
        ]
    }  // [ids de los cursos asignados]
})

/**
 * Middleware para agregar dentro del método 'find' un llamado a una función, en este 
 * caso llamamos al metodo populate.
 */
studentSchema.pre('findOne', function () {
    this.populate("courses.course");
});

const studentsModel = mongoose.model(collectionName, studentSchema);

export default studentsModel;