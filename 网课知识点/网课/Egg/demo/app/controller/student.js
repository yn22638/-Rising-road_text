'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
    async index() {
        const { ctx } = this;
        // ctx.body = 'hi, egg';
        // const result = await ctx.service.student.insertStudent();
        const student = await ctx.service.student.find();
        // ctx.body = student;
        await ctx.render("student.html", {
            title: "首页",
            student: student,
        })
    }
    async findOne() {
        const { ctx } = this;
        const stu = await ctx.service.student.findbyId();
        ctx.body = stu;
    }
    async insertPage() {
        const { ctx } = this;
        await ctx.render("insertStu.html", {

        })
    }
    async insertStu() {
        const { ctx } = this;
        const stu = ctx.request.body;
        // console.log(stu);
        const result = await ctx.service.student.inserStudentAll(stu);
        if (true) {
            ctx.body = "插入成功"
        } else {
            ctx.body = "添加失败"
        }
    }
}

module.exports = StudentController;