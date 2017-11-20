<template>
  <div>
    <h2 class="title">任务清单</h2>
    <div class="addtodos">
      <Input v-model="addtodos" @on-enter="addTodos" placeholder="请输入任务---" style="width: 60%"></Input>
      <Button type="info" @click="addTodos">提交任务</Button>
    </div>
    <Collapse v-model="value1">
      <Panel name="1">
        未完成的任务
        <div slot="content">
          <div v-for='item in notodos' class="row " >
            {{item.val}} 
            <div class='tool'><span>开始时间:</span> {{item.addDate}}
              <Button type="error" class="button" @click="deleteTodos(item.id)">删除</Button>
            <Button type="success" class="button" @click="doneTodos(item.id)">完成</Button>
            </div>  
          </div>
        </div>
      </Panel>
      <Panel name="2">
        已完成的任务
        <div slot="content">
          <div v-for='item in donetodos' class="row">
            {{item.val}}
            <div class='tool'><span>发布时间:</span> {{item.addDate}} <span class="donedate">完成时间:</span>{{item.doneDate}}
              <Button type="error" class="button" @click="deleteTodos(item.id)">删除</Button>
            </div> 
          </div>
        </div>
      </Panel>
      <Panel name="3">
        已删除的任务
        <div slot="content">
          <div v-for='item in deletetodos' class="row">
            <div v-show="item.done==false">
              <Button class="isdo" type="warning" icon="close-round">
                未完成
              </Button>{{item.val}}
               <div>
                <Button type="error" class="button" @click="currentDelete(item.id)">彻底删除</Button>
              <Button type="success" class="button" @click="recover(item.id)">恢复</Button>
             </div>
            </div>
            <div v-show="item.done==true">
              <Button class="isdo" type="primary" icon="checkmark-round">
                已完成
              </Button>{{item.val}}
             <div>
                <Button type="error" class="button" @click="currentDelete(item.id)">彻底删除</Button>
              <Button type="success" class="button" @click="recover(item.id)">恢复</Button>
             </div>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>

</template>
<script>
  import {
    mapState
  } from 'vuex'
  import moment from 'moment';
  export default {
    data() {
      return {
        value1: '1',
        addtodos: '',
        id: 0
      }
    },
    computed: mapState({
      todos() {
        return this.$store.state.todos
      },
      notodos() {
        return this.$store.getters.noTodos.reverse()
      },
      donetodos() {
        return this.$store.getters.doneTodos.reverse()
      },
      deletetodos() {
        return this.$store.getters.deleteTodos.reverse()
      }
    }),
    methods: {
      addTodos() {
        if(this.addtodos===''){
          return
        }
        else{
        this.id = this.id + 1
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var day = date.getDate();
        // var hour = date.getHours();
        // var minute = date.getMinutes();
        // var second = date.getSeconds();
        // let mydate = year + '-' + month + '-' + day + '/' + hour + ':' + minute + ':' + second
       let addDate=moment().format('YYYY-MM-DD HH:mm')
        //添加任务
       let addTodos = {
          val: this.addtodos ,
          id: this.id,
          done: false,
          delete: false,
          addDate:addDate,
          doneDate:''
        }
        this.$store.commit('addTodos', addTodos)
        console.log(addTodos.val)
        this.addtodos=''
        }  
      },
      doneTodos(data) {     //已完成
        this.$store.commit('doneTodos', data)
      },
      deleteTodos(data) {   //删除
        this.$store.commit('deleteTodos', data)
      },
      recover(data) {       //恢复
        this.$store.commit('recover', data)
      },
      currentDelete(data) {  //彻底删除
        this.$store.commit('currentDelete', data)
      }
    },
    // storage() {
    //   let data = window.localStorage.todos;
    //   if (data && data.length) {
    //     this.$store.commit('setTodosStorage', JSON.parse(data));
    //   }
    // },
    mounted() {
      if (window.localStorage.todos && window.localStorage.todos.length) {
        // window.localStorage.clear()
        this.$store.state.todos = JSON.parse(window.localStorage.todos)
        this.id = this.$store.state.todos.length
      }
    },
    watch: {
      todos: {
        handler(val, oldval) {
          //  this.$stor.commit('setTodosStorage')  
          window.localStorage.todos = JSON.stringify(this.$store.state.todos)
        },
        deep: true //对象内部的属性监听，也叫深度监听  
      }
    }
  }

</script>
<style scoped>
  .ivu-collapse-header {
    text-align: left;
  }

  .button {
    display: block;
    float: right;
    margin-left: 5px;
    margin-bottom: 5px;
  }
.isdo{
  margin-right: 10px;
}
  .row {
    border-bottom: 1px solid #ddd;
    text-align: left;
    margin-bottom: 5px;
  }
  .row::after{
    display: block;
    content: '';
    clear: both;
  }
  .title{
    background: #2db7f5;
    padding: 5px 0;
    text-align: center;
  }
.addtodos{
  margin: 10px 0;;
  text-align: center;
}
.tool span{
  font-weight: 10px;
  font-weight: 700;
  line-height: 32px;
}
.donedate{
  margin-left: 15px;
}
</style>
