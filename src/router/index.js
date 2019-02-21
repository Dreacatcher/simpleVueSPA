import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'src/pages/test'
// import test from './_include/test'
Vue.use(Router)
let newArr = [
	{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	}
]
let createRouters = [
	...newArr
	// ...test
]
export default new Router({
	routes: createRouters
})
