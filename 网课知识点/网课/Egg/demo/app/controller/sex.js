'use strict';

const Controller = require('egg').Controller;

class SexController extends Controller {
    async index() {
        //获取上下文对象
        const { ctx } = this;
        //向数据表插入数据ctx.model.sex.方法
        await ctx.model.Sex.create({
            s_name: "张三",
            s_sex: "楠",
        });

        const sex = await ctx.model.Sex.findAll();
        ctx.body = sex;
    }
}

module.exports = SexController;