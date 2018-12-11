<template>
    <div class="home" style="height:100vh; background:#96C4F9">
        <h1>{{connected}}</h1>
        <div class="header">
            NEW GAME
        </div>
        <div class="roundInput" style="height:100vh; background:#96C4F9">
            
            <div class="title">
                Enter Pin
            </div>
            
            <form @submit.prevent="handleEnter">
                <input type="text" id="roundInput" v-model="pin" required min="4"><br>
                <p>Pin is: {{pin}}</p>
                <button type="submit" id="lobbyCreate">Enter Lobby</button>
            </form>
                <br>
            <form @submit.prevent="handleCreate">
                <button type="submit" id="lobbyCreate">Create Lobby</button>
            </form>

            <form @submit.prevent="handleTest">
                <button type="submit" id="lobbyCreate">Test</button>
            </form>
        
        </div> 
    </div> 
</template>

<script>

import router from '@/router'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    data () {
        return {
            pin: ''
        }
    },


    methods: {

        makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },

        handleEnter() {
            router.push('lobby/' + this.pin)
        },

        handleCreate() {
            router.push('lobby/' + this.makeid())
        },

        handleTest() {
            this.$store.commit('connectplease')
        }
    },

    // sockets: {

    // },

    computed: {
        connected () {
            return this.$store.state.username;
        },

        hello () {
            return this.$store.state.test_state;
        }
    }
}
</script>


<style>
</style>
