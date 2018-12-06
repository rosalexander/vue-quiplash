import Vuex from "vuex";
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    
    state: {
        test_state: "Hello World!",
        game_state: null,
        connected: false,
    },

    actions: {
        test(context) {
            context.commit('test')
        }
    },

    mutations: {
        state_lobby() {
            state.game_state = "lobby"
        },

        state_response() {
            state.game_state = "response"
        },

        state_result() {
            state.game_state = "result"
        },


        
    }
})