<template>
  <div id="app" >
    <!--用childmsg把当前页面的num传送给子组件header -->
   	<v-header  :childmsg="num"></v-header>
    <!--用getter接收子组件past过来的数据即栏目数据个数 -->
    <router-view @past='getter' ></router-view>


  </div>
</template>

<script>
import Header from './components/header/header.vue'

export default {
  components:{
  	'v-header':Header
  },
  data(){
    return {
          num:0
    }
  },
  methods:{
    getter(msg){
      this.num=msg;
    }
  },
  mounted(){
    var mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      autoplay: 3000,
    })
  }
}

</script>

<style>


</style>
