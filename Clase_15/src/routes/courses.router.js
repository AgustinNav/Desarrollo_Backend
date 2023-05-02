import { Router } from 'express';
//import del service para Courses.
//import CourseService from '../services/filesystem/courses.service.js';
import CourseService from '../services/db/courses.service.js';

const router = Router();
const coursesService = new CourseService();

router.get('/', async (req, res) => {
    try {
        let courses = await coursesService.getAll();
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudieron obtener los Cursos." });
    }
})

router.post('/', async (req, res) => {
    try {

        let { title, description, teacherName, students } = req.body
        let courseToAdd = { title, description, teacherName, students }

        await coursesService.save(courseToAdd)

        res.sendStatus(201);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo crear el nuevo Curso." });

    }
})

router.delete('/:cId', async (req, res) => {
    try {

        let courseId = req.params.cId

        if (!courseId) throw new Error('ID de Curso inexistente.')

        await coursesService.deleteById(courseId)

        res.sendStatus(204);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el Curso." });

    }
})

router.put('/:cId', async (req, res) => {
    try {

        let id = req.params.cId

        if (!id) throw new Error('ID de Curso inexistente.')

        let { title, description, teacherName, students } = req.body
        let courseUpdated = { id,  title, description, teacherName, students }

        await coursesService.updateById(courseUpdated)

        res.sendStatus(204);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo agregar el Curso." });

    }
})

export default router;