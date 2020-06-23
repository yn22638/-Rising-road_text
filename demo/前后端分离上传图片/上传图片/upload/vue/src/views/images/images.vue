<template>
  <div class="app-container">

     <el-button @click="showDialog(false)" type="primary" size="small" icon="el-icon-edit">新建</el-button>

    <el-row :gutter="20" v-loading.body="listLoading">
      <el-col :span="6" v-for="item in list">
        <div class="grid-content">
          <img :src="item.url" alt="">
          <h3>{{item.title}}</h3>
          <p>{{item.short}}</p>
          <div class="btn-box">
            <el-button @click="showDialog(item.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button @click="destroy(item.id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input placeholder="请填写标题内容" v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="80px">
          <el-input placeholder="请填写简介内容" v-model="form.short" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
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
    </el-dialog>

  </div>
</template>

<script>
import { index, create, destroy, update } from '@/api/images'
import { Message } from 'element-ui'

export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      baseURL:'',
      isEdit:false,
      fileList: [],
      form:{
        title:'',
        short:'',
        url:'',
        ImagesLists_id:''
      },
      dialogFormVisible:false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        ImagesLists_id:''
      }
    }
  },
  created() {
    this.baseURL = process.env.BASE_API;
    this.getList()
  },
  methods: {
    showDialog(id){
      if(id){
        this.isEdit = true;
        this.form = this.list.filter((item) => {
          return item.id === id;
        })[0]
        this.dialogFormVisible = true;
      }else{
        this.isEdit = false;
        this.form.title = '';
        this.form.short = '';
        this.form.url = '';
        this.dialogFormVisible = true;
      }
    },
    getList() {
      const id = this.$route.params && this.$route.params.id;
      this.listQuery.ImagesLists_id = id;
      index(this.listQuery).then((res) => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      }).catch((err) => {
        console.log(err);
      })
    },
    create(){
      const id = this.$route.params && this.$route.params.id
      this.form.ImagesLists_id = id;
      if(this.isEdit){
        update(this.form).then(() => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false;
          this.getList();
        }).catch((err) => {
          console.log(err);
        })
      }else{
        create(this.form).then(() => {
          this.$notify({
            title: '添加成功',
            message: '图片上传成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false;
          this.getList();
          this.$refs.upload.clearFiles();
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    destroy(id){
      this.$confirm("是否删除该数据，删除后将无法恢复！",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(() => {
        destroy(id).then( () => {
          Message({
            type:"success",
            message:"删除成功！"
          })
          this.getList();
        })
      }).catch(() => {
        Message({
          type:'info',
          message:"已取消删除"
        })
      })
    },
    update(){},
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    handleSuccess(file) {
      console.log(file);
      // this.form.url = file.files.file;
      this.form.url = `${this.baseURL}public/upload/images/${file.files.name}`
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.el-col {
  margin-bottom: 20px;
  border-radius: 4px;
}
.el-col img{
  width:100%;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding:10px;
  background: #eeeeee;
}

.btn-box{
  text-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
