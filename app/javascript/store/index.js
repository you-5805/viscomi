import Vue  from 'vue'
import Vuex from 'vuex'

import router from '../router'
import axios  from '../plugins/axios'

axios.interceptors.request.use(
  config => {
    let accessToken = localStorage.getItem('Access-Token')
    config.headers.common['Access-Token'] = accessToken
    return config
  }
)

Vue.use(Vuex)

const state = {
  // ログアウト状態でgetterからカラムを参照しようとした時にエラーが起きるため、nullでカラムも初期化しておく
  // ログイン中のユーザーのUserデータ
  userData: {
    id: null,
    is_manager: null,
    following: {
      id: null
    },
    mute_contact: false
  },
  // いずれかのユーザーがログインしているか
  loggedIn: false,
  // メール認証を求めるモーダル表示用（VueXを使わなくて済むよう要修正）
  signedUp: false,
  isLoading: false,
  modalState: false
}

const mutations = {
  updateUserData  (state, v) {
    state.userData = v
  },
  updateLoggedIn  (state, v) {
    state.loggedIn = v
  },
  updateSignedUp  (state, v) {
    state.signedUp = v
  },
  updateIsLoading (state, v) {
    state.isLoading = v
  },
  updateModalState (state, v) {
    state.modalState = v
  }
}

const getters = {
  userData:        state => state.userData,
  loggedIn:        state => state.loggedIn,
  signedUp:        state => state.signedUp,
  userId:          state => state.userData.id,
  isLoading:       state => state.isLoading,
  modalState:      state => state.modalState,
  followingId:     state => {
    if (state.userData) {
      if (state.userData.following) {
        return state.userData.following.id
      }
    }
  }
}

const actions = {
  // hello_vue.jsで最初に呼び出され、localStorageにuserDataがあればそれを取り出してログイン状態を作る
  autoLogin ({ commit }) {
    let accessToken = localStorage.getItem('Access-Token')
    if (accessToken) {
      commit('updateLoggedIn', true)
      axios.get(`/users/1`).then(res => {
        commit('updateUserData', res.data)
      }).catch(() => {
        commit('updateLoggedIn', false)
      })
    }
  },
  // メール認証が送信されるため、responseは無し
  signUp ({ commit, dispatch }, data) {
    commit('updateIsLoading', true)
    axios.post('/users', data).then(() => {
      // commit('updateSignedUp', true)
      commit('updateIsLoading', false)
      // router.push('/')
      dispatch('logIn', data.user)
    }).catch(err => {
      commit('updateIsLoading', false)
      // 409 Conflictのとき
      if (err.status === 409) {
        alert('登録済みのメールアドレスです。ログインしてください。')
      alert(err)
      }
    })
  },
  // sessions#createでpasswordを確認し、合っていればuserDataを返す
  logIn ({ commit }, data) {
    axios.post('/sessions', {
      "email": data.email,
      "password": data.password
    }).then(res => {
      localStorage.setItem('Access-Token', res.headers['access-token'])
      commit('updateUserData', res.data.userData)
      commit('updateLoggedIn', true)
      commit('updateIsLoading', false)
      if (res.data.userData.is_manager) {
        router.push({ path: 'center', query: { cid: res.data.userData.following.id } })
      } else {
        location.reload()
      }
    }).catch(() => {
      commit('updateIsLoading', false)
      alert('認証に失敗しました。再度お試しください。')
    })
  },
  // localStorageを削除、stateのuserDataをnullで更新し、loggedInはfalseにする
  logOut ({ commit }) {
    localStorage.removeItem('Access-Token')
    commit('updateUserData', {
      id: null,
      is_manager: null,
      admin: false,
      following: {
        id: null
      }
    })
    commit('updateLoggedIn', false)
    // NavigationDuplicatedを避けるためreplaceを使用
    router.replace('/')
  },
  // ログイン中のユーザーのパスワードが正しければ、管理者登録を行い、userDataを更新
  newManager ({ commit }, data) {
    axios.post('/community_centers', data).then(res => {
      commit('updateUserData', res.data.userData)
      router.push('/mypage')
    }).catch(err => {
      // 409 Conflictのとき
      if (err.status === 409) {
        alert('お使いのメールアドレスは既に管理者登録済みです。')
      }
      alert('エラーが発生しました。')
    })
  },
  editProfile ({ commit }, data) {
    // RESTにするため便宜上id=1にしているが、バックエンドのセッション情報からユーザーを特定する
    axios.patch('/users/1', data).then(res => {
      commit('updateUserData', res.data.userData)
      router.push('/mypage')
    }).catch(() => {
      alert('エラーが発生しました')
    })
  },
  editComPage ({ commit }, data) {
    let followingId = this.getters.followingId
    axios.patch('/community_centers/1', data).then(res => {
      commit('updateUserData', res.data.userData)
      router.push({ path: 'center', query: { cid: followingId } })
    }).catch(err => {
      alert(err)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})