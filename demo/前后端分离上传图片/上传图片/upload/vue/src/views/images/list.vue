<template>
  <div class="app-container">

    <el-button @click="showDialog(0)" type="primary" size="small" icon="el-icon-edit">新建</el-button>

    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80" type="index">
      </el-table-column>

      <el-table-column width="200px" align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="简介">
        <template slot-scope="scope">
          <span>{{ scope.row.short }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建者">
        <template slot-scope="scope">
          <span>{{ scope.row.created_by }}</span>
        </template>
      </el-table-column>

      <el-table-column width="190px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | dateFomate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑标题" width="120">
        <template slot-scope="scope">
          <el-button @click="showDialog(scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑标题</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑" width="120">
        <template slot-scope="scope">
          <router-link :to="detailPath+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="删除" width="120">
        <template slot-scope="scope">
          <el-button @click="destroy(scope.row.id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

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
    </el-dialog>

  </div>
</template>

<script>
import { index, create, destroy, update } from '@/api/imagesLists'
import { mapGetters } from "vuex";

export default {
  name: 'ArticleList',
  computed: {
    ...mapGetters(["name", "roles"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    dateFomate(value){
      // let arr = "2018-08-29T06:21:27.000Z";
      let reg = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
      let dateTime = reg.exec(value); 
      let target = `${dateTime[1]}年${dateTime[2]}月${dateTime[3]}日 ${dateTime[4]}:${dateTime[5]}:${dateTime[6]}`
      return target
    }
  },
  data() {
    return {
      isEdit:false,
      detailPath:'',
      dialogFormVisible:false,
      form:{
        title:'',
        short:'',
        created_by:'',
        ImagesListTypes_id : 5,
        department_id:0
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        department_id: -1, //管理员为0
        page: 1,
        limit: 10,
        type:5
      }
    }
  },
  watch: {
    $route(to, from) {
        this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      const path = this.$route.path;
      switch (path) {
        case "/images/famous":
        {
            this.listQuery.type = 1;
            this.form.ImagesListTypes_id = 1;
            
            this.detailPath = '/images/famousimages/'
        }
          break;
        case "/images/books":
        {
            this.listQuery.type = 2;
            this.form.ImagesListTypes_id = 2;
            this.detailPath = '/images/booksimages/'
        }
          break;
        case "/images/honor":
        {
            this.listQuery.type = 3;
            this.form.ImagesListTypes_id = 3;
            this.detailPath = '/images/honorimages/'
        }
          break;
        case "/images/import":
        {
          this.listQuery.type = 4;
          this.form.ImagesListTypes_id = 4;
            this.detailPath = '/images/importimages/'
        }
          break;
        case "/images/banner":
        {
            this.listQuery.type = 5;
            this.form.ImagesListTypes_id = 5;
            this.detailPath = '/images/bannerimages/'
        }
          break;
      }
      this.listQuery.department_id = this.roles[0].department_id;
      this.form.department_id = this.roles[0].department_id;
      this.form.created_by = this.name;  // 添加作者名称
      if (this.listQuery.department_id == -1) {
        this.$router.push({
          path: "/nopermission"
        });
      } else {
        this.getList();
      }
    },
    getList() {
      index(this.listQuery).then((res) => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      }).catch((err) => {
        console.log(err);
      })
    },
    showDialog(id){
      if(id){
        this.isEdit = true;
        this.form = this.list.filter((item) => {
          return item.id === id
        })[0]
        this.dialogFormVisible = true;
      }else{
        this.isEdit = false;
        this.form.title = '';
        this.form.short = '';
        this.dialogFormVisible = true;
      }
    },
    //创建或修改
    create(){
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
        console.log(this.form);
        create(this.form).then(() => {
          this.$notify({
            title: '成功',
            message: '发布成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false;
          this.getList();
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    destroy(id) {
      this.$confirm("是否删除该数据，删除后将无法恢复！",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(() => {
        destroy(id).then( () => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
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
    update(){

    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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

/* .el-row {
    margin-bottom: 20px;
  } */
.el-col {
  margin-bottom: 20px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
