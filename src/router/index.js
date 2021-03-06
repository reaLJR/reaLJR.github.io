import Vue              from 'vue'
import Store            from '../store'
import Router           from 'vue-router'

const index = resolve => require(['@/components/front/index'], resolve)
const AboutMe = resolve => require(['@/components/front/AboutMe'], resolve)
const Home = resolve => require(['@/components/front/Home'], resolve)
const Articles = resolve => require(['@/components/front/Articles'], resolve)
const contact = resolve => require(['@/components/front/contact'], resolve)
const login = resolve => require(['@/components/back/login'], resolve)
const admin = resolve => require(['@/components/back/admin'], resolve)
const posts = resolve => require(['@/components/back/posts'], resolve)
const editor = resolve => require(['@/components/back/editor'], resolve)
const drafts = resolve => require(['@/components/back/drafts'], resolve)
const search = resolve => require(['@/components/back/search'], resolve)
const article = resolve => require(['@/components/front/article'], resolve)
const account = resolve => require(['@/components/back/account'], resolve)
const SearchResult = resolve => require(['@/components/front/SearchResult'], resolve)

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: index,
            children: [
                {path: 'home', name: 'home', component: Home, meta: {title: 'HOME'}},
                {path: 'about', name: 'about', component: AboutMe, meta: {title: 'ABOUT ME'}},
                {path: 'articles', name: 'articles', component: Articles, meta: {title: 'NOTES'}},
                {path: 'articles/:id', name: 'article', component: article},
                {path: 'contact', name: 'contact', component: contact, meta: {title: 'CONTACT'}},
                {path: 'search/:text', name: 'SearchResult', component: SearchResult, meta: {title: 'SEARCH'}}
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {title: '????????????'}
        },
        {
            path: '/admin',
            redirect: '/admin/posts',
            component: admin,
            children: [
                {path: 'posts', name: 'posts', component: posts, meta: {requireAuth: true, title: '????????????'}},
                {path: 'editor', name: 'editor', component: editor, meta: {requireAuth: true, title: '????????????'}},
                {path: 'drafts', name: 'drafts', component: drafts, meta: {requireAuth: true, title: '????????????'}},
                {path: 'search', name: 'search', component: search, meta: {requireAuth: true, title: '????????????'}},
                {path: 'account', name: 'account', component: account, meta: {requireAuth: true, title: '????????????'}}
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (Store.state.user.token && to.name === 'login') {
        next({name: 'posts'})
    } else if (!Store.state.user.token && to.meta.requireAuth) {
        next({name: 'login'})
    } else {
        next()
    }
})

export default router
