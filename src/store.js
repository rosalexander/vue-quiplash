import Vuex from "vuex";
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    
    state: {
        test_state: "Hello World!",
        connected: false,
    },

    actions: {
        test(context) {
            context.commit('test')
        }
    },

    mutations: {
        SOCKET_CONNECT(state) {
            state.connected = true;
            console.log("connected!!!!")
        },

        SOCKET_DISCONNECT(state) {
            state.connected = false;
        },

        connectplease(state) {
            state.connected = true;
        },

        SOCKET_CONNECTPLEASE(state) {
            state.test_state = 'foobar';
        }
    }
})