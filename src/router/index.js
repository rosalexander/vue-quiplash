import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Lobby from '@/components/Lobby'
import Ready from '@/components/Ready'
import Game from '@/components/Game'

Vue.use(Router)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/hello',
    name: 'Hello',
    component: HelloWorld
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: Lobby
  },

  {
    path: '/ready',
    name: 'Ready',
    component: Ready
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game
  }
]

export default new Router({
  routes,
  // mode: abstract
})
