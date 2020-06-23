'use strict';

const Service = require('egg').Service;

class StudentService extends Service {

    //查询所有数据
    async find() {
        console.log(this.app);
        const student = await this.app.mysql.select("students", { //条件
            // where: {
            //     clazz_id: 1, //查询id为1班的同学
            // },
            // columns: ["id", "name"], //只显示id与name
            // orders: [
            //     ["id", "desc"]
            // ], //通过id降序
            // limit: 2, //限制返回的数据量，返回2条
            // offset: 1, //数据偏移量
        });

        return { student: student };
    }

    //查询单条
    async findbyId() {
        const { ctx } = this;
        const id = ctx.params.id;
        const student = await this.app.mysql.get("students", { id: id });
        return { student: student };
    }

    //inset插入
    async insertStudent() {
        const result = await this.app.mysql.insert("students", { id: 88, name: "王二麻子", created_at: "2019-11-21 06:25:11", updated_at: "2019-11-21 06:25:11", clazz_id: 1 });
        return result;
    }

    //update更新
    async updateStu() {
        const result = await this.app.mysql.update("student", { clazz_id: 1, }, { where: { id: 2 } });
        return result;
    }

    //删除delete
    async deleteStu() {
        const result = await this.app.mysql.delete("students", { id: 3 });
    }


    //插入学生
    async inserStudentAll(stu) {
        const result = await this.app.mysql.insert("students", {
            id: stu.id,
            name: stu.name,
            created_at: "2019-11-21 06:25:11",
            updated_at: "2019-11-21 06:25:11",
            clazz_id: stu.clazz_id,
        })
        return result;
    }
}


module.exports = StudentService;