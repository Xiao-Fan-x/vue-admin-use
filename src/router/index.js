import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Router)

/**
 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)

 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 若你想不管路由下面的 children 声明的个数都显示你的根路由
 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

   当路由设置了该属性，则会高亮相对应的侧边栏。
   这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
   }
 */

export const constantRoutes = [

  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  // 登陆 注册
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/login2',
    name: 'login',
    component: () => import('@/views/login/login'),
    hidden: false
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: false
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   meta: {
  //     roles: ['teacher', 'student']
  //   },
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: {
  //       title: 'Dashboard',
  //       icon: 'dashboard',
  //       affix: true,
  //       roles: ['teacher', 'student']
  //     }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/teacher/index',
    meta: {
      roles: ['teacher', 'student']
    },
    children: [{
      path: 'teacher/index',
      name: '首页',
      component: () => import('@/views/dashboard/teacher/dashboard'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: false,
        roles: ['teacher', 'student']
      }
    }]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/student/index',
  //   meta: {
  //     roles: ['student']
  //   },
  //   children: [{
  //     path: 'student/index',
  //     name: '首页',
  //     component: () => import('@/views/dashboard/student/dashboard'),
  //     meta: {
  //       title: '学生首页',
  //       icon: 'dashboard',
  //       affix: false,
  //       roles: ['student']
  //     }
  //   }]
  // },
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/student',
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'student',
      name: 'upload',
      component: () => import('@/views/upload/studentUpload'),
      meta: {
        title: '学生上传',
        icon: 'dashboard',
        // affix: true,
        roles: ['teacher']
      }
    }]
  },
  {
    path: '/createExam',
    component: Layout,
    redirect: '/createExam/index',
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'index',
      name: 'upload',
      component: () => import('@/views/createExam/index'),
      meta: {
        title: '创建考核',
        icon: 'dashboard',
        // affix: true,
        roles: ['teacher']
      }
    }]
  },
  {
    path: '/upload',
    component: Layout,
    // redirect: '/upload/index',
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'index',
      name: 'upload',
      component: () => import('@/views/upload/uploadTest'),
      meta: {
        title: '题目上传',
        icon: 'dashboard',
        roles: ['teacher']
      }
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children:
      [{
        path: '/StudentManager',
        name: 'studentManager',
        component: () => import('@/views/dashboard/teacher/studentManage'),
        meta: {
          title: '学生管理',
          icon: 'form',
          noCache: false,
          roles: ['teacher']
        }
      }]
  },
  {
    path: '/student',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children:
      [{
        path: '/exam',
        name: 'studentExam',
        component: () => import('@/views/dashboard/student/ExamList'),
        meta: {
          title: '学生考核',
          icon: 'form',
          noCache: false,
          roles: ['student']
        }
      }]
  },
  {
    path: '/student',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children:
      [{
        path: '/coding',
        name: 'coding',
        component: () => import('@/views/dashboard/student/Coding'),
        meta: {
          title: '编程测试',
          icon: 'form',
          noCache: false,
          roles: ['student']
        }
      }]
  },
  {
    path: '/exam',
    component: Layout,
    meta: {
      roles: ['student']
    },
    hidden: true,
    children:
      [{
        path: 'examPage',
        name: 'examPage',
        component: () => import('@/views/dashboard/student/startExam'),
        meta: {
          title: '考核页面',
          icon: 'form',
          noCache: false,
          roles: ['student']
        },
      }]
  },
  {
    path: '/show',
    component: Layout,
    redirect: '/show/select',
    name: '查看题库',
    meta: {
      title: '查看题库',
      icon: 'el-icon-s-help',
      roles: ['teacher']
    },
    children: [
      {
        path: 'select',
        name: '选择题',
        component: () => import('@/views/table/Select'),
        meta: {title: '选择题', icon: 'table', roles: ['teacher']}
      },
      {
        path: 'blank',
        name: '填空题',
        component: () => import('@/views/table/Blank'),
        meta: {title: '填空题', icon: 'table', roles: ['teacher']}
      },
      {
        path: 'judge',
        name: '判断题',
        component: () => import('@/views/table/Judge'),
        meta: {title: '判断题', icon: 'table', roles: ['teacher']}
      },
      {
        path: 'essay',
        name: '简答题',
        component: () => import('@/views/table/Essay'),
        meta: {title: '简答题', icon: 'table', roles: ['teacher']}
      },
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {title: 'Menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {title: 'Menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: {title: 'menu2'}
  //     }
  //   ]
  // },


  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
