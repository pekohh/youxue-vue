<template>
  <header class="container">
    <div id="search">
      <a href=""  class="reHome"><img src="static/img/home.png"/></a>
      <input type="text" placeholder="请输入关键词" class="search"/>
      <img src="static/img/search.png" class="search_but"/>
      <input type="submit" value="登录" class="login"/>
    </div>
    <div id="lunbo" class="swiper-container lunbo">
      <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="static/img/ban1.jpg"/></div>
            <div class="swiper-slide"><img src="static/img/ban2.jpg"/></div>
            <div class="swiper-slide"><img src="static/img/ban3.jpg"/></div>
        </div>
    </div>
    <!--用change来接收up传送过来的当前栏目数据 -->
    <v-nav @up='change'></v-nav>
    <div id="des">
      <span class="l "><i>{{msg}}</i>产品仅供团队预定</span>
      <span class="r ">共计<i>{{childmsg}}</i>个</span>
    </div>
  </header>
</template>

<script>
import Nav from '../nav/Nav.vue'
export default {
  data () {
    return {
      msg:'社会大讲堂',
    }
  },
  //接收父组件app.vue传送过来的栏目数据个数的值
  props: ['childmsg'],
  components:{
    'v-nav':Nav
  },
  //用change接收数据
  methods:{
    change(msgs){
      this.msg = msgs;
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#search{background:#0e385e;width:100%;height:48px;text-align:center;}
#search .reHome{position:relative;top:8px;right:8px;}
#search .search{width:70%;border-radius:2px;height:32px;font-size:16px;padding-left:10px;}
#search .search_but{width:24px;height:24px;position:absolute;top:12px;margin-left:-36px;}
#search .login{background:none;color:#fff;font-size:16px;margin-left:8px;}
#lunbo {max-width: 768px;}
#lunbo  img{width:100%;height:80px;display:block;}

#des{background: #f1f2f3;padding:10px 4px;font-size:15px;height:40px;border-bottom:1px solid #ccc;}
#des i{font-weight:bold;color:#f60;}

</style>
