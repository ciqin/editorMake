<template>
  <div class="hello">
    <P class="titleName">{{userInfo.name}}</P>
      
    <P class="titleName" @click="commits">测试132131</P>
  </div>
</template>

<script>
import { store,mutations} from '../store'
export default {
  name: 'HelloWorld1',
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
  methods:{
    commits(){
      mutations.setUserInfo({
        name:"王五"
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
