import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/recommend/index'
import Rank from 'views/rank/index'
import RankDetail from 'views/rank/detail'
import Search from 'views/search/index'
import Playing from 'views/playing'
import Singer from 'views/singer-page'

Vue.use(Router)

const router = new Router(
      {
        mode: 'history',
        routes: [
          {
            path: '/',
            name: 'Home',
            component: Recommend
          },
          {
            path: '/recommend',
            component: Recommend
          },
          {
            path: '/rank',
            component: Rank
          },
          {
            path: '/search',
            name: 'Search',
            component: Search
          },
          {
            name: 'RankDetail',
            path: '/RankDetail/:id',
            component: RankDetail
          },
          {
            name: 'Playing',
            path: '/playing/:songid',
            component: Playing
          },
          {
            name: 'Singer',
            path: '/singer/:singerid',
            component: Singer
          }
        ]
      });
export default router;
