import Vuex from "vuex";
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({

    plugins: [createPersistedState()],
    
    state: {
        test_state: "Hello World!",
        game_state: null,
        connected: false,
        username: '',
        prompts_exists: false,
        prompts: [],
        prompt_ids: [],
        votes: [],
        answers: [],
        points: 0,
        progress: 25,
        counter: 5,
        pin: ''
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

        set_username(state, payload) {
            state.username = payload;
        },
        
        set_prompts(state, payload) {
            state.prompts = payload.prompts;
            state.prompt_ids = payload.prompt_ids;
            state.prompts_exists = true;
        },
        
        submit_answer(state, payload) {
            state.answers.push(payload);
        },

        reset_prompts(state) {
            state.prompts = [];
            state.prompt_ids = [];
            state.answers = [];
            state.votes = [];
            state.prompts_exists = false;
        },

        increment_timer(state) {
            state.progress += 5;
            state.counter += 1;
        },

        clear_timer(state) {
            state.progress = 25;
            state.counter = 5;
        },

        set_pin(state, payload) {
            state.pin = payload;
        },

        submit_vote(state, payload) {
            console.log("voted")
            state.votes.push(payload);
        },
        
    }
})