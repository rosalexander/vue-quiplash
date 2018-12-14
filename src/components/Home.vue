<style scoped>
    body {
        background-color: #96C4F9;
    }
    .home {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #96C4F9;
    }
    .header {
        font-family: "Krungthep";
        font-size: 50px;
        text-align: center;
        background-color: #96C4F9;
        margin-top: 25px;
    }


    .roundInput {
        font-family: "Krungthep";
        text-align: center;
        background-color: #96C4F9;
    }
    #roundInput {
        font-family: "Krungthep";
        font-size: 20px;
        text-align: center;
        width: 90px;
        margin-top: 3%;
        margin-bottom: 5%;
        
    }
    .title {
        font-family: "Krungthep";
        font-size: 30px;
        text-align: center;
        margin-top: 60px;
        background-color: #96C4F9;
    }
    #lobbyCreate {
        font-size: 20px;
        background-color: #0CC40E;
        color: black;
        padding: 13px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    
    }

    #lobbyCreate:hover {
        background-color: #77df7c;
        color: white;
        transition: 0.5s;
        
    }

</style>
<template>
    <div class="home">
        <!-- <h1>{{connected}}</h1>
        <h1>{{hello}}</h1> -->
        <div class="header">
            NEW GAME
        </div>
        <div class="title">
            Enter Pin
        </div>
        <div class="roundInput">
            <form @submit.prevent="handleEnter">
                <input type="text" id="roundInput" autocomplete = "off" v-model="pin" required min="4"><br>
                <!-- <p>Pin is: {{pin}}</p> -->
                <button type="submit" id="lobbyCreate">Enter Lobby</button>
            </form>
                <br>
            <form @submit.prevent="handleCreate">
                <button type="submit" id="lobbyCreate">Create Lobby</button>
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
            return this.$store.state.connected;
        },

        hello () {
            return this.$store.state.test_state;
        }
    }
}
</script>



