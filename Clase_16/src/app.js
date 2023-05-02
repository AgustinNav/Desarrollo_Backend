    import express from 'express';
import __dirname from './util.js';
import handlebars from 'express-handlebars';

import mongoose from 'mongoose';
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'
import viewsRouter from "./routes/views.router.js";
import studentsModel from './services/db/models/students.model.js';
import coursesModel from './services/db/models/courses.model.js';
import userModel from './services/db/models/users.model.js'

//Declarando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))

//Declaración de Routers:
app.use('/',viewsRouter);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);

const SERVER_PORT = 9091;
app.listen(9091, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const connectMongoDB = async ()=>{
    try {
        // await mongoose.connect('mongodb://localhost:27017/clase16_indexs_populate?retryWrites=true&w=majority');
        // console.log("Conectado con exito a MongoDB usando Moongose. Base -> Clase16_indexs_populate");

        // // EXPLAIN - Nos dice la informacion del acceso a la base de datos, tiempos de demora, etc
        // console.log("Busqueda por usuario: Agustin \n");
        // let response = await userModel.find({first_name: "Agustin"}).explain('executionStats')
        // console.log(response)
        
        // POPULATE
        await mongoose.connect('mongodb://localhost:27017/colegio?retryWrites=true&w=majority')
        console.log('Conexion a la base de datos establecida')

        // // Creamos un Estudiante

        // let newStudents = await studentsModel.create({
        //     first_name: "Agustin",
        //     last_name: "Navarro",
        //     age: 20
        // })

        // // Le añadimos la referencia a los cursos
        
        // let student = await studentsModel.findOne({_id: newStudents._id}).populate('courses')
        // console.log(student);

        // // Creamos el curso

        // let newCourse = await coursesModel.create({
        //     title: "Desarrollo Full Stack",
        //     description: "Este curso esta bueno",
        //     teacherName: "Marcelo Alleruzo"
        // })

        // let course = await coursesModel.findOne({_id: newCourse._id})
        // console.log(course);

        // // Generamos la referencia

        let student = await studentsModel.findOne({_id:'643f233459e192ac43edc7da'})
        console.log(JSON.stringify(student, null, '\t'));  // Ver el contenido del curso gracias al middleware del model students

        // student.courses.push({course: "643f233459e192ac43edc7dd"})
        // console.log(JSON.stringify(student, null, "\t"));
        
        // let result = await studentsModel.updateOne({_id:'643f233459e192ac43edc7da'}, student)
        // console.log(result);


        // let course = await coursesModel.findOne({_id: "643f233459e192ac43edc7dd"})
        // course.students.push({student: "643f233459e192ac43edc7da"})
        
        // result = await coursesModel.updateOne({_id: "643f233459e192ac43edc7dd"}, course)
        // console.log(result);

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();