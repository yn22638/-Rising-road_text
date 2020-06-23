'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    async uploadimg() {
        const stream = await this.ctx.getFileStream();
        const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/upload/images', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        this.ctx.body = {
            files: {
                name: filename,
                // file: `/public/upload/images/${filename}`
                file: `http://127.0.0.1:7001/public/upload/images/${filename}`,
            },

        }
        console.log(this.ctx.body)
    }
}

module.exports = HomeController;