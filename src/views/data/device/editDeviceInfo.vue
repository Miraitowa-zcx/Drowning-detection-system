<template>
  <div style="width: 80%">

    <!-- 标题 -->
    <div style="margin-bottom: 30px">编辑设备信息</div>

    <!-- 表单 -->
    <div style="text-align: center">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="设备名称" prop="devicename">
          <el-input v-model="form.devicename" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="devicetype">
          <el-input v-model="form.devicetype" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入位置"></el-input>
        </el-form-item>
        <el-form-item label="Rtsp地址" prop="rtspurl">
          <el-input v-model="form.rtspurl" placeholder="请输入Rtsp地址"></el-input>
        </el-form-item>
        <el-form-item label="设备用户名" prop="deviceusername">
          <el-input v-model="form.deviceusername" placeholder="请输入设备用户名"></el-input>
        </el-form-item>
        <el-form-item label="设备密码" prop="devicepassword">
          <el-input v-model="form.devicepassword" placeholder="请输入设备密码"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 提交按钮 -->
    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="save" size="medium">提交</el-button>
    </div>


  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: 'EditDeviceInfo',
  data() {
    return {
      form: {},
      rules: {
        devicename: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        devicetype: [
          {required: true, message: '请输入设备类型', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        location: [
          {required: true, message: '请输入位置', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        rtspurl: [
          {required: true, message: '请输入Rtsp地址', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        deviceusername: [
          {required: true, message: '请输入设备用户名', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        devicepassword: [
          {required: true, message: '请输入设备密码', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    const id = this.$route.query.id
    request.get("/devices/" + id).then(res => {
      this.form = res.data
    })
  },
  methods: {
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          request.put('/devices/update/' + this.form.id, this.form).then(res => {
            if (res.code === '200') {
              this.$notify.success('更新成功')
              this.$router.push("/deviceInfo")
            } else {
              this.$notify.error(res.msg)
            }
          })
        } else {
          this.$notify.error('请输入完整信息')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
