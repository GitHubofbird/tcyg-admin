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
      <el-form :model="currentProduct"
               label-width="100px"
               status-icon
               size="medium"
               style="margin:50px 20px"
               :disabled="disabled"
               :rules="rules"
               ref="currentProduct">
        <el-form-item prop="name"
                      label="商品名称">
          <el-input v-model="currentProduct.name"
                    placeholder="请输入商品名称"></el-input>

        </el-form-item>
        <el-form-item prop="oldPrice"
                      label="历史价格">
          <el-input v-model="currentProduct.oldPrice"
                    placeholder="请输入商品价格"
                    type="number">
            <template slot="append">元</template></el-input>

        </el-form-item>
        <el-form-item prop="newPrice"
                      label="商品现价">
          <el-input v-model="currentProduct.newPrice"
                    placeholder="请输入商品优惠价格"
                    type="number">
            <template slot="append">元</template></el-input>

        </el-form-item>
        <el-form-item prop="stock"
                      label="商品库存">
          <el-input v-model="currentProduct.stock"
                    placeholder="请输入商品库存"
                    type="number">
            <template slot="append">件/个</template></el-input>
        </el-form-item>
        <el-form-item v-if="currentProduct.salesVolume"
                      prop="salesVolume"
                      label="商品销量">
          <el-input v-model="currentProduct.salesVolume"
                    placeholder="请输入商品库存"
                    disabled="true">
            <template slot="append">件/个</template></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="currentProduct.secondCategory"
                     placeholder="请选择分类"
                     value-key="scId"
                     style="width:100%"
                     filterable>
            <el-option v-for="(item,index) in SecondCategories"
                       :key="index"
                       :label="item.scName"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="store"
                      label="所属店铺">
          <el-input v-model="currentProduct.store"
                    placeholder="请输入商品所属店铺"></el-input>
        </el-form-item>
        <el-form-item prop="description"
                      label="商品描述">
          <el-input v-model="currentProduct.description"
                    type="textarea"
                    rows="3"
                    placeholder="请输入商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">

          <el-upload class="product-uploader"
                     :action="action.localhost"
                     :show-file-list="false"
                     :on-success="handleUploadSuccess"
                     :before-upload="beforeUpload">
            <img v-if="currentProduct.imageUrl"
                 :src="currentProduct.imageUrl"
                 class="product-img">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top:50px;float:left"
                      v-if="!disabled">
          <el-button type="primary"
                     @click="show = false">取消</el-button>
          <el-button type="info"
                     @click="submitForm(currentProduct)"
                     v-if="!isAdd">修改</el-button>
          <el-button type="info"
                     @click="submitForm(currentProduct)"
                     v-if="isAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>
<script>
import { searchProductByName, getProductList, deleteProduct, updateProduct, getSecondCategoryList } from '../../api/index'
export default {
  data () {
    return {
      searchInfo: '',
      isAdd: false,
      show: false,
      disabled: false,
      tableData: [],
      value: true,
      currentProduct: {

      },
      SecondCategories: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        oldPrice: [
          { required: false, message: '请输入商品价格', trigger: 'blur' }

        ],
        newPrice: [
          { required: true, message: '请输入商品优惠价', trigger: 'blur' }

        ],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' }

        ],
        description: [
          { required: false, message: '请输入商品描述', trigger: 'blur' }
        ]
      },
      action: {
        'cloud': 'http://121.36.19.219:8080/upload/uploadImg',
        'localhost': 'http://localhost:8080/upload/uploadImg'
      }
    }
  },
  mounted () {
    this.findAllProduct()
  },
  methods: {
    // 显示商品抽屉
    addProduct () {
      this.show = true
      this.isAdd = true
      this.disabled = false
      this.findAllSecondCategory()
      this.currentProduct = {}
    },
    // 查询所有商品
    findAllProduct () {
      getProductList().then(data => {
        if (data.code === 200) {
          this.tableData = data.data
        }
      })
    },
    // 查询所有二级分类
    findAllSecondCategory () {
      getSecondCategoryList().then(data => {
        if (data.code === 200) {
          this.SecondCategories = data.data
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
      updateProduct(currentProduct).then((data) => {
        // console.log(data.data.data)
        if (data.code === 200) {
          this.show = false
          this.$message.success(data.data)
          this.findAllProduct()
        }
      })
    },
    // 显示修改抽屉
    showUpdatePage () {
      this.show = true
      this.disabled = false
      this.isAdd = false
      this.findAllSecondCategory()
    },
    // 删除分类
    deleteProduct () {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProduct(this.currentProduct).then((data) => {
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
    },
    // 图片上传成功
    handleUploadSuccess (res, file) {
      this.currentProduct.imageUrl = res.data
      console.log(this.currentProduct.imageUrl)
    },
    // 图片上传之前对图片格式进行验证
    beforeUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('图片大小不能超过5M!')
      }
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
.product-uploader {
  border: 1px solid #555;
  border-radius: 5px;
  height: 100px;
  width: 100px;
  line-height: 100px;
}
.product-uploader .product-img {
  width: 100px;
  height: 100px;
}
</style>
