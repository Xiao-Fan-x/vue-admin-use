import {getInfo} from '@/api/user'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import store from "@/store";

const state = {
  // token: getToken(),
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userId: '',
  userName: '',
  phone: '',
  role: '',
  department: '',
  major: '',
  className: '',
  grade: '',
  isOnline: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.userId = user.userId
    state.userName = user.userName
    state.phone = user.phone
    state.role = user.role
    state.roles = user.roles
    state.department = user.department
    state.major = user.major
    state.className = user.className
    state.grade = user.grade
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ISONLINE: (state, is) => {
    state.isOnline = is
  }
}

const actions = {
  login({commit}, data) {
    const {user, token} = data
    commit('SET_TOKEN', token)
    commit('SET_USER', user)
    // commit('SET_ROLES', user.roles)
    commit('SET_ISONLINE', '1')

    setToken(token)
    console.log('user login --')
    store.dispatch('permission/generateRoutes', user.roles)
  },

  firstLogin({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_ISONLINE', 1)
      resolve()
    })
  },
// user login
// login({commit}, userInfo) {
//   const {username, password} = userInfo
//   return new Promise((resolve, reject) => {
//     login({username: username.trim(), password: password}).then(response => {
//       const {data} = response
//       commit('SET_TOKEN', data.token)
//       setToken(data.token)
//       console.log('user login --')
//       resolve()
//     }).catch(error => {
//       reject(error)
//     })
//   })
// },

// get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response

        if (!data) {
          reject('没有相关信息，请重新登陆！')
        }

        const {roles, name, avatar, introduction} = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

// user logout
//   logout({commit, state, dispatch}) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         commit('SET_TOKEN', '')
//         commit('SET_ROLES', [])
//         commit('SET_USERID', '')
//
//         removeToken()
//         resetRouter()
//
//         // reset visited views and cached views
//         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
//         dispatch('tagsView/delAllViews', null, {root: true})
//
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USERID', '')
      commit('SET_USER', '')

      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, {root: true})

      resolve()
    }).catch(error => {
      reject(error)
    })
  },

// remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}
// dynamically modify permissions
//   async changeRoles({commit, dispatch}, role) {
//     const token = role + '-token'
//
//     commit('SET_TOKEN', token)
//     setToken(token)
//
//     const {roles} = await dispatch('getInfo')
//     console.log(roles)
//     resetRouter()
//
//     // generate accessible routes map based on roles
//     const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
//     // dynamically add accessible routes
//     router.addRoutes(accessRoutes)
//
//     // reset visited views and cached views
//     dispatch('tagsView/delAllViews', null, {root: true})
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
