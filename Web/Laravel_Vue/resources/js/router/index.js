import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home/Home.vue";
import Signup from "../components/auth/Signup.vue";
import Graph from "../../views/graphView/Graph.vue";
import MonthChart from "../components/graph/MonthChart.vue";
import DayChart from "../components/graph/DayChart.vue";

// import Recommend from "../components/Recommend/Recommend.vue";
import FootRecommend from '../components/foot_recommend/FootRecommend';
import RecommendMain from '../../views/RecommendMain.vue'

import ReviewMain from "../../views/reviewView/ReviewMain.vue";
import ReviewDetail from "../../views/reviewView/ReviewDetail.vue";
import Store from "../components/review/Store.vue";
import StoreReview from "../components/review/StoreReview.vue";
import Detailed from '../components/Recommend/Detailed';

import Recipe from '../components/foot_recommend/Recipe';
import ReviewTest from '../../views/ReviewTest';

import NewStore from '../components/new_store/NewStore';

Vue.use(VueRouter);

const routes = [
{
    path: "/",
    name: "home",
    component: Home
},
// {
//     path: "/signup",
//     name: "signup",
//     component: () =>
//         import ( /* webpackChunkName: "about" */ "../views/auth/Signup.vue")
// },
{
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */'../components/auth/Login.vue')
},

{
    path: '/signup',
    name: 'signup',
    component: Signup

},
{
    path: "/graph",
    name: "graph",
    component: Graph,
    children: [{
        path: 'monthchart',
        name: 'monthchart',
        component: MonthChart
    },
    {
        path: 'daychart',
        name: 'daychart',
        component: DayChart
    }
    ],

},

{
    path: "/recommendmain",
    name: "RecommendMain",
    component: RecommendMain,
    children: [
    // {
    //     path: "recommend",
    //     name: "Recommend",
    //     component: Recommend
    // },
    {
        path: "footrecommend",
        name: "FootRecommend",
        component: FootRecommend
    }
    ],

    },
    {
        path: '/detailed/:id',
        name: 'Detailed',
        component: Detailed
    },
{
    path: "/review",
    name: "review",
    component: ReviewMain,
},
{
    path: "/store/:id",
    name: "store",
    component: Store,
    props: true,
    children: [{
        path: 'storereview',
        name: 'storereview',
        component: StoreReview,
        props: true
    }]
},
{
    path: "/review/detail/:review_id",
    name: "reviewdetail",
    component: ReviewDetail
},
{
    path: "/newstore",
    name: "NewStore",
    component: NewStore
},
{
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe
},
{
    path: '/ReviewTest',
    name: 'ReviewTest',
    component: ReviewTest
},
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;