<template>
  <div id="filter">
    <div class="wripper">
      <h3>筛选</h3>       
      <dl class="level">
        <dt>适合学段</dt>
        <dd><span >小学1-2年级</span></dd>
        <dd><span>小学3-4年级</span></dd>
        <dd><span>小学5-6年级</span></dd>
        <dd><span>初中</span></dd>
        <dd><span>高中</span></dd>
      </dl>
      <dl class="classes">
        <dt><span>课程</span></dt>
        <dd><span>地理</span></dd>
        <dd><span>语文</span></dd>
        <dd><span>数学</span></dd>
        <dd><span>英语</span></dd>
        <dd><span>美术</span></dd>
        <dd><span>音乐</span></dd>
      </dl>
      <dl class="days">
        <dt>活动天数</dt>
        <dd><span>1日</span></dd>
        <dd><span>2-4日</span></dd>
        <dd><span>4-7日</span></dd>
        <dd><span>7日以上</span></dd>
      </dl>
      <dl class="price">
        <dt>价格区间</dt>
        <dd>
          <input type="text" placeholder="最低价格" id="min-price">
          <span>~</span>
          <input type="text" placeholder="最高价格" id="max-price">
        </dd>       
      </dl>
      <ul class='submit'>
        <li>
          <input type="reset" class="reset" value="重置"/>        
        </li>
        <li>
          <input type="button" class="sure" value="完成" @click="finish"/>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //用props里的arr接收content组件传送过来的arrs
  props:['arr'],
  mounted(){
    //点击筛选出来选框
      $("#filterbtn").click(function(){
        $("#filter").toggle();
      })
    //筛选学段
      $("#filter .level dd").click(function(){
        var index=$(this).index()
        $("#filter .level dd").eq(index-1).children("span").addClass("addbtn"). parents().
        siblings().children("span").removeClass("addbtn")
      })
      //筛选课程
      $("#filter .classes dd").click(function(){
        var index=$(this).index()
        $("#filter .classes dd").eq(index-1).children("span").addClass("addbtn"). parents().siblings().children("span").removeClass("addbtn")
      })
      //筛选天数
      $("#filter .days dd").click(function(){
        var index=$(this).index()
        $("#filter .days dd").eq(index-1).children("span").addClass("addbtn"). parents().siblings().children("span").removeClass("addbtn")
      })
      //重置
      $(".submit li input:reset").click(function(){
        $("#filter dl dd span").removeClass("addbtn");
        $("#min-price").val("");
        $("#max-price").val("");
      })
  },
  methods:{
      //完成
      finish(){
         $("#content .contect-list ul").html("");
         this.post(this.filter(this.arr));
         $("#filter").hide();
      },
      //筛选面板的操作
      filter(arrs){
        if($('.level dd .addbtn'))
        {   
            arrs[0].level=$('.level dd .addbtn').text();  
        };
        if($('.classes dd .addbtn'))
        {
          arrs[1].classes=$('.classes dd .addbtn').text();  
        };
        if($(".days dd .addbtn"))
        {
          arrs[2].days=$(".days dd .addbtn").text();
        };
        if($(".price dd #min-price")){
          arrs[3].minPrice=$(".price dd #min-price").val()
        };
        if($(".price dd #max-price")){
          arrs[4].maxPrice=$(".price dd #max-price").val()
        }
        return arrs
       
      },
      //向父组件content传送arrs这个数组
      post(arrs){
        this.$emit('post',arrs)
      }
  }
}
</script>

<style scoped>
/*筛选的样式*/
#filter{display:none;z-index:1000;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);}
#filter .wripper {background:#fff;position:fixed;top:0;bottom:0;right:0;left:20%;}
#filter h3{text-align:center;background:#ccc;line-height:50px;}
#filter dl {margin:20px 0;padding:0 20px;height:100px;}
#filter dl dt {line-height: 30px;margin:10px 0;}
#filter dl dd {float:left;line-height: 20px;margin:10px 0;width:33.33%;height:20px;text-align:center;}
#filter dl dd span{width:90%;display:block;background:#f1f2f3;font-size:14px;line-height: 20px;}
#filter dl.price {width:100%;}
#filter dl.price dd{width:100%;}
#filter dl.price dd input {text-align:center;border:3px solid #ccc;border-radius:2px;float:left;width:200px;height:25px;background:#fff;}
#filter dl.price dd span{float:left;display:block;width:20px;height:25px;margin:0 10px;}
#filter .submit {position:fixed;bottom:0;right:0;left:20%;}
#filter .submit li{width:50%;height:40px;float:left;}
#filter .submit li input{width:100%;height:40px;color:#fff;}
#filter .submit li input.reset{background:#869bae;}
#filter .submit li input.sure{background:#0e385e;}
#filter dl dd span.addbtn{background: #869bae;
    color: #fff;}
</style>
