import { Router } from 'express';
//import del service para Students. (Se puede probar con el service del file system o el de mongoose)
//import StudentService from '../services/filesystem/students.service.js';
import StudentService from '../services/db/students.service.js';

const router = Router();
const studentService = new StudentService();

router.get('/', async (req, res) => {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
})

router.post('/', async (req, res) => {
    try {

        let { name, lastName, age, courses } = req.body
        let studentToAdd = { name, lastName, age, courses }

        await studentService.save(studentToAdd)

        res.sendStatus(201);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo agregar el estudiante" });

    }
})

router.delete('/:sId', async (req, res) => {
    try {

        let studentId = req.params.sId

        if (!studentId) throw new Error('ID de estudiante inexistente.')

        await studentService.deleteById(studentId)

        res.sendStatus(204);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el estudiante" });

    }
})

router.put('/:sId', async (req, res) => {
    try {

        let id = req.params.sId

        if (!id) throw new Error('ID de estudiante inexistente.')
        
        let { name, lastName, age, courses } = req.body
        let studentUpdated = { id, name, lastName, age, courses }

        await studentService.updateById(studentUpdated)

        res.sendStatus(204);

    } catch (error) {

        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar el estudiante" });

    }
})

export default router;