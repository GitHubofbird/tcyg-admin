<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="box-card-breadcrumb el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>一级分类</el-breadcrumb-item>
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
                   @click="addCategroy">添加分类</el-button>
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
      <el-table-column prop="cname"
                       label="分类名称"
                       align="center">
      </el-table-column>
      <!-- <el-table-column label="用户状态"
                       align="center">
        <el-switch v-model="value"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
      </el-table-column> -->
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
                   @click="deleteCategory"></el-button>
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
      <el-form :model="currentCategory"
               label-width="100px"
               status-icon
               size="medium"
               style="margin:50px 20px"
               :disabled="disabled">
        <el-form-item prop="cname"
                      label="分类名称">
          <el-input v-model="currentCategory.cname"
                    placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:540px;float:left"
                      v-if="!disabled">
          <el-button type="primary"
                     @click="show = false">取消</el-button>
          <el-button type="info"
                     @click="submitForm(currentCategory)"
                     v-if="!isAdd">修改</el-button>
          <el-button type="info"
                     @click="submitForm(currentCategory)"
                     v-if="isAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>
<script>
import { getCategoryList, updateCategory, deleteCategory, searchByName } from '../../api/index'
export default {
  data () {
    return {
      searchInfo: '',
      isAdd: false,
      show: false,
      disabled: false,
      tableData: [],
      value: true,
      currentCategory: {}

    }
  },
  mounted () {
    this.findAllCategory()
  },
  methods: {
    // 查询所有分类
    findAllCategory () {
      getCategoryList().then(data => {
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
      this.currentCategory = row
      console.log(this.currentCategory)
    },
    // 删除分类
    deleteCategory () {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(this.currentCategory).then((data) => {
          if (data.code === 200) {
            this.$message.success(data.data)
            this.findAllCategory()
          } else {
            this.$message.success(data.data)
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
    submitForm (currentCategory) {
      updateCategory(currentCategory).then((data) => {
        // console.log(data.data.data)
        if (data.code === 200) {
          this.show = false
          this.$message.success(data.data)
          this.findAllCategory()
        }
      })
      this.findAllCategory()
    },
    // 显示添加分类
    addCategroy () {
      this.show = true
      this.disabled = false
      this.isAdd = true
      this.currentCategory = {}
    },
    // 显示详情
    showDetails () {
      this.show = true
      this.disabled = true
    },
    // 显示修改页面
    showUpdatePage () {
      this.show = true
      this.disabled = false
      this.isAdd = false
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
