<template>
    <div>
        <div class="header">
            LOBBY
        </div>
        <div class="waitingMessage">
            Waiting for more players to join...
        </div>

        <div class=roundInput>
            
            <div v-if="!hasName">
                <form @submit.prevent="handleEnter">
                    <input type="text" id="roundInput" v-model="user" required min="4"><br>
                    <button type="submit" id="lobbyCreate">Enter Name</button>
                </form>
            </div>

            <div v-else>
                <p>{{user}}</p>
            </div>

            <button class="btnPin">PIN {{$route.params.id}} </button>
            <form action="ready.html">
                <input type="submit" value="START GAME">
            </form>
        </div> 
    </div>
</template>

<script>

    import io from 'socket.io-client';

    export default {
        name: 'Lobby',

        data() {
            return {
                user: '',
                hasName: false,
                message: '',
                messages: [],
                members: {},
                socket : io('http://' + window.location.hostname + ':3000')
            }
        },

        methods: {
            handleEnter() {
                this.hasName = true;
            }
        }
    }
</script>

<style>

</style>
