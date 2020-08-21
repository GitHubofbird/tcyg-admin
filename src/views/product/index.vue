<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="box-card-breadcrumb el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
                   @click="addProduct">添加商品</el-button>
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
      <el-table-column label="商品图片"
                       align="center">
        <template slot-scope="scope">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.imageUrl"
                    :fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="商品名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="oldPrice"
                       label="历史价格"
                       align="center">
      </el-table-column>
      <el-table-column prop="newPrice"
                       label="商品现价"
                       align="center">
      </el-table-column>
      <el-table-column prop="stock"
                       label="库存"
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
                   @click="deleteProduct"></el-button>
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
      <ProductForm :currentProduct="currentProduct"
                   :isAdd="isAdd">

      </ProductForm>
    </el-drawer>
  </el-card>
</template>
<script>
import ProductForm from './components/productForm'
import { searchProductByName, getProductList, deleteProduct, updateProduct, addProduct } from '../../api/index'
export default {
  components: {
    ProductForm
  },
  data () {
    return {
      searchInfo: '',
      isAdd: false,
      show: false,

      tableData: [],
      value: true,
      currentProduct: {

      }

    }
  },
  mounted () {
    this.findAllProduct()
    console.log(this.currentProduct)
  },
  methods: {
    // 显示商品抽屉
    addProduct () {
      this.show = true
      this.isAdd = true
      this.disabled = false
      this.currentProduct = {}
    },
    // 查询所有商品
    findAllProduct () {
      getProductList().then(data => {
        if (data.code === 200) {
          this.tableData = data.data
          this.currentProduct = data.data[0]
        }
      })
    },
    // 模糊查询
    handleSearch () {
      searchProductByName(this.searchInfo).then(data => {
        if (data.code === 200) {
          this.tableData = data.data
        }
      })
    },
    // 获取表格当前行数据
    getDetails (row) {
      this.currentProduct = row
      console.log(this.currentProduct)
    },
    // 查看分类详情
    showDetails () {
      this.show = true
      this.disabled = true
    },
    // 提交表单
    submitForm (currentProduct) {
      if (!this.isAdd) {
        updateProduct(currentProduct).then((data) => {
          // console.log(data.data.data)
          if (data.code === 200) {
            this.show = false
            this.$message.success(data.data)
            this.findAllProduct()
          }
        })
      } else {
        addProduct(currentProduct).then(data => {
          if (data.code === 200) {
            this.show = false
            this.$message.success(data.data)
            this.findAllProduct()
          }
        })
      }
    },
    // 显示修改抽屉
    showUpdatePage () {
      this.show = true
      this.disabled = false
      this.isAdd = false
    },
    // 删除分类
    deleteProduct () {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProduct(this.currentProduct.id).then((data) => {
          if (data.code === 200) {
            this.$message.success(data.data)
            this.findAllProduct()
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
