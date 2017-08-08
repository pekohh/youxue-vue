<template>
  <div id="content" class="container" v-scroll="add">
    <div class="content-choose">
      <span class="l">综合排序</span>
      <span class="r" id="filterbtn">筛选 </span>    
    </div>
    <div class="contect-list">     
      <ul>
        <li v-for="(item,index) in arrList" >
          <router-link :to="'/article/'+item.id">
            <h3><a href="">{{item.title}}</a></h3>
            <div class="img-con"><img :src="item.imgurl" class="l"></div>
            <div class="con-con">
              <p>产品编号：<span>{{item.num}}</span></p>
              <p>{{item.shinning}}</p>
              <p>研学课程教案：{{item.leanplan}}</p>
              <p>活动天数：{{item.days}}</p>
              <p class="price">参考价：￥{{item.prices}}/学生</p>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="load-more">共计<i>{{columnnum}}</i>个</div>
    </div>
    <!--用arr绑定本组件的数据arrs,传送给子组件panel -->
    <!--用get方法来接收子组件post传送过来的数据arrs -->
    <v-panel :arr="arrs"  @post="get"></v-panel>
  </div>
</template>

<script>
import Panel from '../panel/panel.vue'
export default {
  data () {
    return {
      arrList:[],
      newList:[],
      arrs:[{"level":''},{"classes":''},{"days":''},{"minPrice":this.d},{"maxPrice":this.e}],
      filterAry:[],
      start:0,
      pageSize:10,
      page:1,
      path:'shdjt',
      d:'',
      e:'',
      flag:"true",
      columnnum:0
    }
  },
  components:{
    'v-panel':Panel
  },
  mounted(){
    this.path=this.$route.path.substr(1);
    this.fetchData();   
  },
  beforeUpdate(){
    this.past()
  },
  methods:{
    fetchData(){ 
      var _this=this;
      this.$http.get('../static/data/aa.txt').then(function(res){ 
        var sum=res.data.length//数据总个数
        _this.filter()  //过滤一下过滤条件数组中的空元素 
        // 根据导航的点击。把相应栏目的数据挑出来
        if(_this.newList.length==0){
          for(var i=0;i<sum;i++)
          {
            if(res.data[i].column==_this.path){
              _this.newList.push(res.data[i])
            }           
          }
        }
        //判断过滤条件。重写newList
        if(_this.filterAry.length!=0)//长度不为0,说明有过滤条件
        {
          for(var i=0;i<_this.newList.length;i++)
          {
            if(!_this.filterObj(_this.newList[i])){
              _this.newList.splice(i,1);
              i--
            }
          }
        }          

        var len=_this.newList.length;//本栏目数据总条数

        _this.columnnum=len;         
        var len1=_this.pageSize;
        if(len1>=len)
        {
          len1=len;
          $('#content .load-more').css('display','block')
        }         
        for(_this.start;_this.start<len1;_this.start++)
        {
          _this.arrList.push(_this.newList[_this.start])
        } 
      }).catch(function(err){
        console.log(err)
      })
    },
    //页面滚到底部，page++
    add(){
      if(this.columnnum>=this.pageSize){
        this.page++
        this.start=this.pageSize
        this.pageSize=this.page*10
      }   
    },
    //把当前组件里的数据个数past传送给父组件
    past(){
      this.$emit('past', this.columnnum) 
    },
    //接收子组件panel传送过来的数组arrs
    get(msg){
      this.flag=!this.flag;//用这个状态监听数组是否改变
      this.arrs=msg
    },
    //过滤数组中的空元素
    filter(){
       this.filterAry=this.arrs.filter(function(element){
        for(var k in element)
        {           
          return element[k]!==''&& element[k]!==undefined;
        }       
      }) 
    },
    //过滤不符合过滤条件的对象
    filterObj(obj){
      var judge=this.filterAry.every(function(element){
        return (element[Object.keys(element)]==obj[Object.keys(element)])||(Object.keys(element)=="minPrice"?element[Object.keys(element)]<=obj.prices:element[Object.keys(element)]>=obj.prices)               
      }) 
      return judge                     
    }
  },
  watch:{
    //监控路由变化。其ajax重新加载新的column的数据
    $route(to){
      this.path=to.path.substr(1)     
      this.start=0;
      this.pageSize=10;
      this.page=1;
      this.arrList=[];
      this.newList=[]; 
      this.arrs=[{"level":''},{"classes":''},{"days":''},{"minPrice":this.d},{"maxPrice":this.e}];
      this.fetchData();
    },
    //监控页面变化。其page+1.说明加载新一页面的数据
    page(val){
      this.fetchData();     
    },
    //监控arrs如果flag变化了。则说明数组的值发生了变化。则触发新的动作
    flag(val){
     this.newList=[]; 
     this.start=0;
     this.pageSize=10;
     this.fetchData();
    }
  },
  //滚动条滚动到页面底部。则
  directives: {
      scroll: {
        bind: function (el, binding){
          window.addEventListener('scroll', ()=>{    
           if(document.body.offsetHeight-window.innerHeight-document.body.scrollTop==0){
             let fnc = binding.value;   
              fnc();              
            }        
          })
        }
      }
  }
}
</script>

<style scoped>
/*正文*/
.content-choose{padding:20px 4px;font-size:14px;color:#f60;border-bottom:1px solid #ccc;line-height:20px;height: 20px;}
.content-choose>span#filterbtn{padding-bottom:0;cursor:pointer;}
.contect-list ul li{width:100%;height:180px;border-bottom:1px solid #ccc;padding:10px 0;}
.contect-list ul li:hover{background:#dcd9d9;}
.contect-list ul li h3 a{font-size:20px;color:#000;line-height:30px;}
.contect-list ul li .img-con {float:left;width:120px;height:90px;margin-top:10px;}
.contect-list ul li .img-con img{width:120px;height:90px;}
.contect-list ul li .con-con{margin-left:130px;padding-right:10px;}
.contect-list ul li .con-con p{font-size:12px;line-height: 20px;overflow:hidden;white-space: nowrap;text-overflow:;}
.contect-list ul li .con-con p.price{font-size:18px;color:#f60;font-weight:bold;line-height: 30px;}
#content .load-more{text-align:center;display:none}
#content .load-more i{color:#f60}
</style>
