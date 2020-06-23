<template>
  <mavon-editor ref="md" @imgAdd="$imgAdd"  @imgDel="$imgDel" v-model="value"></mavon-editor>
</template>

<script>
import axios from "axios";
// import Vue from "vue";
// import mavonEditor from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "http://127.0.0.1:7001/uploadimg",
        method: "post",
        data: formdata,
        num: "123",
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log("assssssssssss");
        console.log(res);
        let url = res.data.files.file;
        this.$refs.md.$img2Url(pos, url);
      });

      console.log("asaaa");
    },
    $imgDel(pos, $file){
          let delURL = pos[0];
          axios.post("http://127.0.0.1:7001/deleteimg",{
            url:delURL
          }).then(res => {
            console.log("删除成功")
          })

        }
  }
};
</script>

<style>
</style>
