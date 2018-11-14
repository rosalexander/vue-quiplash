<template>
    <div class="home">
        <div class="header">
            NEW GAME
        </div>
        <div class=roundInput>
            
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
        
        </div> 
    </div> 
</template>

<script>

import router from '@/router'

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
        }
    }
}
</script>


<style>
</style>
