import { 
    addGroupsListener, 
    addUserListener, 
    removeGroupAndUserListeners, 
    addSingleGroupListener,
    removeSingleGroupListener
} from '@/common/socket'

import ws from '@/common/ws'



export default {
    getUser({ commit, state }) {
        return ws.getUser(state.user._id).then(user => {
            commit('setUser', { user })
        })
    },
    signIn({ state, commit }, payload) {
        return ws.signIn(payload).then(user => {
            // 初始化用户监听器
            addUserListener(user, state)
            // 初始化群组监听器
            addGroupsListener(user, state)
            commit('setUser', { user })
        })
    },
    signUp({ commit, state }, payload) {
        return ws.signUp(payload).then(user => {
            addUserListener(user, state)
            addGroupsListener(user, state)
            commit('setUser', { user })
        })
    },
    signOut({ state, commit, dispatch }) {
        ws.getUser(state.user._id).then(removeGroupAndUserListeners)
        commit('removeUser')
    },
    setActiveList({ commit }, type) {
        commit('setActiveList', { type })
        commit('removeCurrentOne')
    },
    getList({ commit, state }) {
        if (state.activeList === 'friends') {
            return ws.getFriends(state.user._id)
                .then(list => commit('setList', list))
        } else {
            return ws.getGroups(state.user._id)
                .then(list => commit('setList', list))
        }
    },
    createGroup({ state, dispatch }, keyword) {
        return ws.createGroup({
            from: state.user._id,
            data: { name: keyword }
        }).then(({ groupId }) => {
            addSingleGroupListener(groupId, state)
            return dispatch('getList')
        })
    },
    searchUsers({ state, commit }, keyword) {
        return ws.searchUsers({
            keyword,
            from: state.user._id
        }).then(result => {
            commit('setResult', { result })
        })
    },
    searchGroups({ commit }, keyword) {
        return ws.searchGroups(keyword).then(result => {
            commit('setResult', { result })
        })
    },
    addGroup({ state, dispatch }, groupId) {
        addSingleGroupListener(groupId, state)
        return ws.addGroup({
            from: state.user._id,
            groupId
        }).then(() => {
            return dispatch('getList')
        })
    },
    addFriend({ state, dispatch }, friendId) {debugger;
        return ws.addFriend({
            from: state.user._id,
            friendId
        }).then(() => {
            return dispatch('getList')
        })
    },
    removeResult({ commit }) {
        commit('removeResult')
    },
    changeCurrentOne({ commit }, item) {
        commit('changeCurrentOne', { item })
    },
    pullMsg({ commit, state }, page) {
        let params = {
            from: state.user._id,
            data: { page }
        }
        if (state.activeList === 'friends') {
            params.friendId = state.currentOne._id
        } else {
            params.groupId = state.currentOne._id
        }

        return ws.pullMsg(params).then(({ data }) => {
            commit('pullMsg', data)
            if (data.length < 1) return false
        })
    },
    pushMsg({ commit, state }, content) {
        let params = {
            from: state.user._id,
            data: { content }
        }

        if (state.activeList === 'friends') {
            params.friendId = state.currentOne._id
        } else {
            params.groupId = state.currentOne._id
        }

        ws.pushMsg(params)
        if (state.activeList === 'friends') {
            commit('pushMsg', {
                from: _.pick(state.user, ['_id', 'name', 'avatar']),
                content
            })
        }
    },
    removeFriend({ commit, state, dispatch }) {
        let id = state.currentOne._id
        let params = {
            from: state.user._id,
            friendId: id
        }

        if (state.count[id]) {
            state.count = _.assign(state.count, {
                [id]: 0
            })
        }

        return ws.removeFriend(params).then(() => {
            commit('removeCurrentOne')
            dispatch('getList')
        })
    },
    removeGroup({ commit, state, dispatch }) {
        let id = state.currentOne._id
        let params = {
            from: state.user._id,
            groupId: id
        }

        // 同时移除群组的消息监听
        removeSingleGroupListener(id)

        if (state.count[id]) {
            state.count = _.assign(state.count, {
                [id]: 0
            })
        }

        return ws.removeGroup(params).then(() => {
            commit('removeCurrentOne')
            dispatch('getList')
        })
    },
    getGroupMember({ state }) {
        let groupId = state.currentOne._id
        return ws.getGroupMember({ groupId }).then(({ data }) => data)
    },
    updateUser({ state, commit }, data) {
        let params = {
            from: state.user._id,
            data
        }

        return ws.updateUser(params).then(user => {
            commit('setUser', { user })
            return user
        })
    },
    modifyAvatar({ state, commit }, data) {
        let params = {
            from: state.user._id,
            data
        }

        return ws.modifyAvatar(params).then(user => commit('setUser', { user }))
    },
    uploadImg({ state, commit }, data) {
        let params = {
            from: state.user._id,
            data
        }

        return ws.uploadImg(params)
    }
}