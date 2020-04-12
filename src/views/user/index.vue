<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="box-card-breadcrumb el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索框 -->
    <el-row class="box-card-search-row">
      <el-col>
        <el-input placeholder="请输入内容"
                  v-model="searchInfo"
                  class="box-card-search-row-input">

          <el-button slot="append"
                     icon="el-icon-search"
                     @click="handleSearch"></el-button>
        </el-input>
        <el-button type="primary"
                   class="box-card-search-row-btn"
                   @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->

    <el-table :data="tableData"
              style="width:100%;margin-top:20px;background-color:#2d2d2d"
              @row-click="getDetails"
              height="450">
      <el-table-column label="#"
                       type="index"
                       width="50px"
                       align="center"></el-table-column>
      <el-table-column prop="username"
                       label="用户账号"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="用户姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="sex"
                       label="用户性别"
                       align="center">
      </el-table-column>
      <el-table-column prop="phone"
                       label="用户电话"
                       align="center"></el-table-column>
      <el-table-column prop="email"
                       label="用户邮箱"
                       align="center"></el-table-column>
      <el-table-column label="用户状态"
                       align="center">
        <el-switch v-model="value"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <el-button icon="el-icon-search"
                   circle
                   size="small"
                   @click="showUserDetails"></el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   circle
                   size="small"
                   @click="editUser"></el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   circle
                   size="small"
                   @click="deleteUser"></el-button>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination :page-sizes="[5, 10, 20]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>
    <!-- 5.Drawer抽屉 -->
    <el-drawer :visible.sync="show"
               :with-header="false">
      <el-form :model="currentUser"
               label-width="100px"
               status-icon
               size="medium"
               style="margin:50px 20px"
               :ref="currentUser"
               :rules="rules"
               :disabled="disabled">
        <el-form-item prop="username"
                      label="用户账号">
          <el-input v-model="currentUser.username"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户实名"
                      prop="name">
          <el-input v-model="currentUser.name"
                    placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码"
                      prop="password"
                      v-if="isAdd">
          <el-input v-model="currentUser.password"
                    placeholder="请输入初始化密码"></el-input>
        </el-form-item>
        <el-form-item label="用户性别"
                      prop="sex">
          <el-input v-model="currentUser.sex"
                    placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱"
                      prop="email">
          <el-input v-model="currentUser.email"
                    placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户电话"
                      prop="phone">
          <el-input v-model="currentUser.phone"
                    placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="currentUser.role"
                     placeholder="请选择用户角色"
                     value-key="roleId"
                     style="width:100%"
                     filterable>
            <el-option v-for="(item,index) in currentRules"
                       :key="index"
                       :label="item.roleName"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-top:100px;float:left"
                      v-if="!disabled">
          <el-button type="primary"
                     @click="show = false">取消</el-button>

          <el-button type="info"
                     @click="submitForm(currentUser)"><span v-if="!isAdd">修改</span><span v-else-if="isAdd">添加</span></el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>
<script>
import { findAllUser, updateUser, deleteUser, getRuleList, searchUserByName } from '../../api/index'
export default {
  data () {
    return {
      searchInfo: '',
      show: false,
      disabled: false,
      tableData: [],
      value: true,
      currentUser: {},
      isAdd: false,
      currentRules: [],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入初始化密码', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入用户性别', trigger: 'blur' }],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入用户联系方式', trigger: 'blur' }]
      }

    }
  },
  mounted () {
    this.findAllUser()
  },
  methods: {
    // 查询所有用户
    findAllUser () {
      findAllUser().then(data => {
        if (data.code === 200) {
          this.tableData = data.data
        } else {
          this.$message.error('查询失败')
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('系统异常')
      })
    },
    // 显示修改用户信息组件
    editUser (index) {
      this.isAdd = false
      this.show = true
      this.disabled = false
      this.findAllRule()
    },
    // 获取当且行数据
    getDetails (row) {
      this.currentUser = row
      // console.log(this.currentUser)
    },
    // 删除用户
    deleteUser () {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(this.currentUser).then((data) => {
          if (data.code === 200) {
            this.$message.success(data.data)
            // 删除成功后重新查询用户
            this.findAllUser()
          } else {
            this.$message.warning(data.data)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交表单,用于用户的添加和修改
    submitForm (currentUser) {
      this.$refs[currentUser].validate((valid) => {
        if (valid) {
          updateUser(currentUser).then((data) => {
            // console.log(data.data.data)
            if (data.code === 200) {
              this.show = false// 数据提交成功关闭抽屉
              this.$message.success(data.data)
              this.findAllUser()
            }
          })
        } else {
          this.$message.warning('请补全用户信息')
          return false
        }
      })
    },
    // 显示用户详情
    showUserDetails () {
      this.isAdd = false
      this.show = true
      this.disabled = true
    },
    // 显示添加用户抽屉
    addUser () {
      this.disabled = false
      this.show = true
      this.isAdd = true
      this.findAllRule()
      this.currentUser = {}
    },
    findAllRule () {
      getRuleList().then(data => {
        if (data.code === 200) {
          this.currentRules = data.data
        } else {
          this.$message.error('获取角色列表失败!')
        }
      })
    },
    handleSearch () {
      searchUserByName(this.searchInfo).then(data => {
        if (data.code === 200) {
          this.tableData = data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.box-card {
  height: 100%;
  background-color: #2d2d2d;
  border: #2d2d2d;
}
.box-card .box-card-search-row {
  margin-top: 20px;
}
.box-card .box-card-search-row .box-card-search-row-input {
  width: 300px;
  float: left;
}
.el-input__inner {
  background-color: #000;
}
.box-card .box-card-search-row .box-card-search-row-btn {
  margin-left: 20px;
  float: left;
  background-color: #1e1e1e;
  border: #1e1e1e;
  color: red;
}
</style>
