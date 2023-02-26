import Student from '../models/student_model'
import { Express } from 'express'
import { Request, Response } from 'express'
import MyResponse from '../common/MyResponse'
import MyError from '../common/MyError'
import MyRequest from '../common/MyRequest'
const getAllStudents = async (req: Request, res: Response) => {
    let students = {}
    try {
        students = await Student.find()
        res.status(200).send(students)
    } catch (err) {
        res.status(400).send({ 'err': "failed to get all students from DB" })
    }
}
const getStudent = async (req: Request, res: Response) => { }
const getStudentById = async (req) => {
    try {
        const student = await Student.findById(req.body.id)
        console.log("post: ", student)
        return new MyResponse(student, req.id, null)
    } catch (err) {
        return new MyResponse(null, req.id, new MyError(400, err.message))
    }
}

const addStudent = async (req: Request, res: Response) => {
    const req_name = req.body.name
    const req_id = req.body.id
    const req_phone = req.body.phone
    const req_img = req.body.img
    const student = new Student({
        name: req_name,
        id: req_id,
        img: req_img,
        phone: req_phone
    })
    try {
        const newSt = await student.save()
        res.status(200).send(newSt)
    }
    catch (err) {
        console.log("Student-> catch error")
        res.status(400).send({
            'error': 'failed to adding Student',
        })
    }
}

export = { getAllStudents,getStudentById, addStudent }