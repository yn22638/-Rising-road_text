const Controller = require('egg').Controller;

class ImagesListsService extends Controller {
    async index() {
        const option = this.ctx.request.query;
        const data = await this.ctx.service.imagesLists.findByQuery(option);
        this.ctx.body = {
            code:20000,
            data:data
        }
    }

    async show() {
        const id = this.ctx.params.id;
        const docs = await this.ctx.service.imagesLists.findById(id);
        this.ctx.body = {
            code: 20000,
            data: docs
        }
    }

    async create() {
        const option = this.ctx.request.body
        if (await this.ctx.service.imagesLists.create(option)) {
            this.ctx.body = {
                code: 20000,
                data: "成功"
            }
        } else {
            this.ctx.body = {
                code: 30000,
                data: "失败"
            }
        }
    }

    async update() {
        try {
            const option = this.ctx.request.body;
            const id = this.ctx.params.id;
            option.id = id;

            await this.ctx.service.imagesLists.update(option);
            this.ctx.body = {
                code: 20000,
                data: "成功"
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                data: "失败"
            }
        }
    }

    async destroy() {
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.imagesLists.destroy(id);
            this.ctx.body = {
                code: 20000,
                data: "成功"
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                data: "失败"
            }
        }
    }
}

module.exports = ImagesListsService;