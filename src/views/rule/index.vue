<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="box-card-breadcrumb el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
                   @click="addRule">添加角色</el-button>
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
      <el-table-column prop="roleName"
                       label="角色名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="rule"
                       label="角色描述"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <el-button icon="el-icon-search"
                   circle
                   size="small"
                   @click="showDetails"></el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   circle
                   size="small"
                   @click="showUpdatePage"></el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   circle
                   size="small"
                   @click="deleteRule"></el-button>
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
      <el-form :model="currentRule"
               label-width="100px"
               status-icon
               size="medium"
               style="margin:50px 20px"
               :disabled="disabled">
        <el-form-item prop="roleName"
                      label="角色名称">
          <el-input v-model="currentRule.roleName"
                    placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="rule"
                      label="角色描述">
          <el-input v-model="currentRule.rule"
                    placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:500px;float:left"
                      v-if="!disabled">
          <el-button type="primary"
                     @click="show = false">取消</el-button>
          <el-button type="info"
                     @click="submitForm(currentRule)"
                     v-if="!isAdd">修改</el-button>
          <el-button type="info"
                     @click="submitForm(currentRule)"
                     v-if="isAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>
<script>
import { searchByName, getRuleList, deleteRule, updateRule } from '../../api/index'
export default {
  data () {
    return {
      searchInfo: '',
      // 是否为添加操作
      isAdd: false,
      // 是否显示抽屉
      show: false,
      // 表单内容是否可编辑
      disabled: false,
      tableData: [],
      value: true,
      currentRule: {}

    }
  },
  mounted () {
    this.findAllRule()
  },
  methods: {
    // 查询所有分类
    findAllRule () {
      getRuleList().then(data => {
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
    // 获取表格当前行数据
    getDetails (row) {
      this.currentRule = row
      // console.log(this.currentRule)
    },
    // 删除分类
    deleteRule () {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRule(this.currentRule).then((data) => {
          if (data.code === 200) {
            this.$message.success(data.data)
            // 删除成功后重新获取数据
            this.findAllRule()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交表单
    submitForm (currentRule) {
      updateRule(currentRule).then((data) => {
        // console.log(data.data.data)
        if (data.code === 200) {
          this.show = false
          this.$message.success(data.data)
          this.findAllRule()
        }
      })
    },
    // 显示添加分类
    addRule () {
      this.show = true
      this.disabled = false
      this.isAdd = true
      this.currentRule = {}
    },
    // 显示修改页面
    showUpdatePage () {
      // 页面显示
      this.show = true
      // 表单内容可编辑
      this.disabled = false
      // 非添加页面
      this.isAdd = false
    },
    // 查看详情
    showDetails () {
      this.show = true
      // 内容不可编辑
      this.disabled = true
    },
    // 模糊查询
    handleSearch () {
      searchByName(this.searchInfo).then(data => {
        if (data.code === 200) {
          this.tableData = data.data
        } else {
          this.$message.error('查询失败')
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
