import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Lobby from '@/components/Lobby'
import Ready from '@/components/Ready'
import Game from '@/components/Game'
import Answers from '@/components/Answers'
import Results from '@/components/Results'
<<<<<<< HEAD
import Response from '@/components/Response'
=======
import Timer from '@/components/Timer'
>>>>>>> 4ac5f77bd09d569b2c7b8fc9b6b42f5e23df997c

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
  },

  {
    path: '/answers',
    name: 'Answers',
    component: Answers
  },

  {
    path: '/results',
    name: 'Results',
    component: Results
  },

  {
<<<<<<< HEAD
    path: '/response',
    name: 'Response',
    component: Response
=======
    path: '/timer',
    name: 'Timer',
    component: Timer
>>>>>>> 4ac5f77bd09d569b2c7b8fc9b6b42f5e23df997c
  }
]

export default new Router({
  routes,
  // mode: abstract
})
