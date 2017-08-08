<template>
  <nav>
      <ul>       
        <router-link to="/shdjt" tag="li" active-class="active" >
          <a href="" >社会大课堂</a>
        </router-link>
        <router-link to="/gnyx" tag="li" active-class="active"">
          <a href="">国内研学</a>
        </router-link>
        <router-link to="/gjyx" tag="li" active-class="active" >
          <a href="">国际游学</a>
        </router-link>
        <router-link to="/kwqzy" tag="li" active-class="active" >
          <a href="">酷玩亲子游</a>
        </router-link>
        <router-link to="/bjdj" tag="li" active-class="active" >
          <a href="">北京地接</a>
        </router-link>
        <router-link to="/yxykt" tag="li" active-class="active" >
          <a href="">研学云课堂</a>
        </router-link>
        <router-link to="/bjdy" tag="li" active-class="active" >
          <a href="">北京导游</a>
        </router-link> 
        <router-link to="/typt" tag="li" active-class="active">
          <a href="">同业平台</a>
        </router-link> 
        <router-link to="/yxjd" tag="li" active-class="active" >
          <a href="">研学基地</a>
        </router-link> 
        <router-link to="/zyzfw" tag="li" active-class="active" >
          <a href="">志愿者服务</a>
        </router-link>
        <router-link to="/zcfg" tag="li" active-class="active" >
          <a href="">政策法规</a>
        </router-link>
        <router-link to="/gywm" tag="li" active-class="active">
          <a href="">关于我们</a>
        </router-link>                
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navList:[{'shdjt':'社会大讲堂'},{'gnyx':'国内研学'},{'gjyx':'国际游学'},{'kwqzy':'酷玩亲子游'},{'bjdj':'北京地接'},{'yxykt':'研学云课堂'},{'bjdy':'北京导游'},{'typt':'同业平台'},{'yxjd':'研学基地'},{'zyzfw':'志愿者服务'},{'zcfg':'政策法规'},{'gywm':'关于我们'}]
    }
  },
  methods:{
      up:function (path){  
        var column;
        for(var i in this.navList){      
            if(this.navList[i][path])
            {
              column=this.navList[i][path]
            }
        }
       this.$emit('up',column); //主动触发up方法，column为向父组件header.vue传递的数据
        
      }
  },
  watch:{
  //监听路由变化,只要路由变化就触发向父组件传递此路由的动作
    $route(to){
      var path=to.path.substr(1)
      this.up(path);
      console.log(path)
    }
  }
}
</script>

<style scoped>
nav{width:100%;overflow-x:scroll;white-space:nowrap;}
nav ul li{display:inline-block;text-align:center;height:48px;line-height:48px;margin:0 4px;}
nav ul li a{color:#000;display:block}
nav ul li.active{border-bottom:2px solid #f60;}
nav ul li.active a{color:#f60;text-decoration:none;}
</style>
