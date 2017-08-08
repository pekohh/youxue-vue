<template> 
    <div class="content container">
      <h3>{{arrList.title}}</h3>
        <time>{{arrList.time}}</time>
        <p>{{arrList.content}}</p>
    </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      arrList:[]
    }
  },
  mounted(){
    this.fetchData(this.$route.params.id);
  },
  methods:{
      fetchData(id){
        var _this=this;
        this.$http.get('../static/data/aa.txt').then(function(res){
          _this.arrList=res.data[id]
        }).catch(function(err){
            console.log(err)
        })
      }
  }

}
</script>

<style scoped>
  .content{}
  h3{font-size:20px;line-height:40px;color:#f60;font-weight:bold;text-align:center;margin-top:10px;}
  p{font-size:16px;line-height:36px;}
</style>
