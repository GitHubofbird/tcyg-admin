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
              <span @click="handleLoginout">退出</span>
              <span>{{username}}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="home-container-aside"
                  width="200px">
          <el-menu background-color="#252526"
                   text-color=" #e2b462"
                   :router="true"
                   :unique-opened="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-setting"></i>角色管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/rule"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/user"><i class="el-icon-menu"></i>用户列表</el-menu-item>

              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-notebook-2"></i>分类管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/category"><i class="el-icon-menu"></i>一级分类</el-menu-item>
                <el-menu-item class="menu-item"
                              index="/secondCategory"><i class="el-icon-menu"></i>二级分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-shopping-bag-1"></i>商品管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/product"><i class="el-icon-menu"></i>商品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/order"><i class="el-icon-menu"></i>订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-shopping-bag-1"></i>接口管理</template>
              <el-menu-item-group>
                <el-menu-item class="menu-item"
                              index="/swagger"><i class="el-icon-menu"></i>接口列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home-container-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  beforeCreate () {
    const token = this.$store.state.token
    console.log(token)
    if (!token) {
      this.$message.warning('您好,请登录!')
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    handleLoginout () {
      window.sessionStorage.clear()
      this.$store.commit('token', '')
      this.$router.push({ path: '/' })
      this.$message.success('退出成功')
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
  min-width: 1400px;
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
}
</style>
