<template>
      <!-- action上传得地址 -->
      <!-- on-success	文件上传成功时的钩子 -->
      <!-- on-remove	文件列表移除文件时的钩子 -->
      <!-- before-remove	删除文件之前的钩子，参数为上传的文件和文件列表，
      若返回 false 或者返回 Promise 且被 reject，则停止删除。 -->
      <!-- file-list	上传的文件列表, 例如: [{name: 'food.jpg', 
      url: 'https://xxx.cdn.com/xxx.jpg'}] -->
  <el-upload
        ref="upload"
        class="upload-demo"
        :action="baseURL +'upload/imageslist'"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
</template>

<script>
export default {
  data() {
    return {
      baseURL: "",
      isEdit: false,
      fileList: [],
      // form: {
      //   title: "",
      //   short: "",
      //   url: "",
      //   ImagesLists_id: ""
      // },
      // dialogFormVisible: false,
      // list: null,
      // total: 0,
      // listLoading: true,
      // listQuery: {
      //   ImagesLists_id: ""
      // }
    };
  },
  created() {
    this.baseURL = process.env.BASE_API;
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    handleSuccess(file) {
      console.log(file);
      // this.form.url = file.files.file;
      this.form.url = `${this.baseURL}public/upload/images/${file.files.name}`;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
