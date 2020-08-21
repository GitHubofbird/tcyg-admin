<template>
  <el-form label-width="100px"
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
      <el-select v-model="currentProduct.secondCategory.scName"
                 placeholder="请选择分类"
                 value-key="id"
                 style="width:100%"
                 filterable>
        <el-option v-for="(item,index) in SecondCategories"
                   :key="index"
                   :label="item.scName"
                   :value="item.id">
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
</template>
<script>
import { getSecondCategoryList } from '../../../api/index'
export default {
  props: {
    currentProduct: {
      type: Object,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  mounted () {
    this.findAllSecondCategory()
  },
  methods: {
    // 查询所有二级分类
    findAllSecondCategory () {
      getSecondCategoryList().then(data => {
        if (data.code === 200) {
          this.SecondCategories = data.data
        }
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
  },
  data () {
    return {
      disabled: false,
      SecondCategories: [],
      action: {
        'cloud': 'http://121.36.19.219:8080/upload/uploadImg',
        'localhost': 'http://localhost:8080/upload/uploadImg'
      },
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
      }
    }
  }
}
</script>
<style scoped>
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
