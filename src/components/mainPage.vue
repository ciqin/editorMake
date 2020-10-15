<template>
  <div class="hello">
      <el-container>
          <el-header><Nav></Nav></el-header>
      </el-container>
      <SiderBtn></SiderBtn>
      <el-main class="main">
          <router-view/>
      </el-main>
  </div>
</template>

<script>
import { store,mutations} from '../store'
import Nav from './nav'
import SiderBtn from './siderBtn'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    userInfo() {
      return store.userInfo
    }
  },
  components:{
    Nav,SiderBtn
  },
  created(){
    mutations.setUserInfo({
      name:"张山"
    })
  },
  methods:{
    commits(){
      mutations.setUserInfo({
        name:"李四"
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  height: calc(100vh - 60px);
  float: right;
  width: calc(100% - 60px);
  padding: 0;
  background-color: #ebedf1;
}
</style>
