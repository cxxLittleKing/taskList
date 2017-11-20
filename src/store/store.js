import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import moment from 'moment';
export default new Vuex.Store({
	state:{
        todos: [],
        currentDelete:[] //彻底删除的记录
    },
    getters:{
        noTodos: state => {
            return state.todos.filter(todo => {
                return !todo.done && !todo.delete
            })
          },
        doneTodos: state=> {
            return state.todos.filter(todo => {
                return  todo.done && !todo.delete
            })
          },
          deleteTodos: state => {
            return state.todos.filter(todo => {
                return todo.delete
            })
          }
    },
	mutations:{
		addTodos(state,data){
            state.todos.push(data)
        },
        doneTodos(state,data){
            state.todos.forEach((item)=>{
                if(item.id==data){
                    item.done=true
                    item.doneDate=moment().format('YYYY-MM-DD HH:mm')
                }
            })    
        },
        deleteTodos(state,data){
            state.todos.forEach((item)=>{
                if(item.id==data){
                    item.delete=true
                }
            })
        },
        recover(state,data){
            state.todos.forEach((item)=>{
                if(item.id==data){
                    item.delete=false
                }
            })
        },
        currentDelete(state,data){
            state.todos.forEach((item)=>{
                if(item.id==data){
                    state.currentDelete.push(item)
                    let index=state.todos.indexOf(item)
                    state.todos.splice(index,1)
                }
            })
        }

    },
    actions:{

    }
})