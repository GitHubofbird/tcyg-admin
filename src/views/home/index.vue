<template>
  <div class="home">
    <el-container class="home-container">
      <el-header class="home-container-header">
        <el-row>
          <el-col :span="22">
            <div class="home-container-header-title">同城易购后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="home-container-header-msg">
              <span>退出</span>
              <span>{{username}}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="home-container-aside"
                  width="200px">
          <el-menu :default-openeds="['1']"
                   background-color="#252526"
                   text-color=" #e2b462">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="1-1"
                              @click="findAllUser()"><i class="el-icon-menu"></i>所有用户</el-menu-item>
                <el-menu-item class="menu-item"
                              index="1-2"><i class="el-icon-menu"></i>普通用户</el-menu-item>
                <el-menu-item class="menu-item"
                              index="1-3"><i class="el-icon-menu"></i>加盟商家</el-menu-item>
                <el-menu-item class="menu-item"
                              index="1-4"><i class="el-icon-menu"></i>商城会员</el-menu-item>
                <el-menu-item class="menu-item"
                              index="1-5"><i class="el-icon-menu"></i>系统用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-shopping-bag-1"></i>商品管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="2-1"><i class="el-icon-menu"></i>选项1</el-menu-item>
                <el-menu-item class="menu-item"
                              index="2-2"><i class="el-icon-menu"></i>选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-notebook-2"></i>分类管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="3-1"><i class="el-icon-menu"></i>一级分类</el-menu-item>
                <el-menu-item class="menu-item"
                              index="3-2"><i class="el-icon-menu"></i>二级分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>角色管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="4-1"><i class="el-icon-menu"></i>一级分类</el-menu-item>
                <el-menu-item class="menu-item"
                              index="4-2"><i class="el-icon-menu"></i>二级分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home-container-main">Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '姑苏'
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
.home-container {
  height: 100%;
}
.home-container .home-container-header {
  line-height: 60px;
  background-color: #3c3c3c;
  color: #bababa;
  font-size: 24px;
  text-align: left;
}
.home-container .home-container-header .home-container-header-msg {
  color: skyblue;
  font-size: 14px;
  font-weight: normal;
}
.home-container-header .home-container-header-msg span {
  cursor: pointer;
  padding: 0 4px;
}
.home-container .home-container-aside {
  background-color: #252526;
}
.home-container .home-container-aside .menu-item {
  font-size: 12px;
  text-align: right;
}
.home-container .home-container-main {
  background-color: #1e1e1e;
  color: #52b9fe;
}
</style>
