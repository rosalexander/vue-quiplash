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
        users_prompt: [],
        votes: [],
        answers: [],
        points: 0,
        progress: 0,
        counter: 0,
        pin: '',
        members: {}
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
            state.users_prompt = payload.users_prompt;
            state.prompts_exists = true;
        },
        
        submit_answer(state, payload) {
            state.answers.push(payload);
        },

        reset_prompts(state) {
            state.prompts = [];
            state.prompt_ids = [];
            state.users_prompt;
            state.answers = [];
            state.votes = [];
            state.prompts_exists = false;
        },

        increment_timer(state, payload) {
            state.progress += parseInt(payload);
            state.counter += 1;
        },

        // modify_progress(state, payload) {
        //     state.progress = parseInt(payload);
        // },

        clear_timer(state) {
            state.progress = 0;
            state.counter = 0;
        },

        set_pin(state, payload) {
            state.pin = payload;
        },

        set_members(state, payload) {
            console.log(payload, "store")
            let current_members = {}
            payload.forEach((member) => {
                if (!(member in state.members)) {
                    current_members[member] = 0
                }
                else {
                    current_members[member] = state.members[member]
                }
            })

            state.members = current_members
        },

        add_win(state, payload) {
            state.members[payload.member] += 1
        },

        submit_vote(state, payload) {
            console.log("voted")
            state.votes.push(payload);
        },
        
    }
})