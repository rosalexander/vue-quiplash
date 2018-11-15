<template>
    <div>
        <div class="header">
            LOBBY Test
        </div>
        <div class="waitingMessage">
            Waiting for more players to join...
        </div>

        <div class=roundInput>
            
            <div v-if="!hasName">
                <form @submit.prevent="handleEnter">
                    <input type="text" id="roundInput" v-model="username" required min="4"><br>
                    <button type="submit" id="lobbyCreate">Enter Name</button>
                </form>
            </div>

            <div v-else>
                <h1>{{username}}</h1>
                <h1>{{user_id}}</h1>
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
                username: '',
                hasName: false,
                message: '',
                messages: [],
                members: {},
                socket : io('http://' + window.location.hostname + ':3000'),
                user_id : localStorage.getItem('uUID')
            }
        },

        methods: {
            handleEnter() {
                this.hasName = true
                this.socket.emit('new_client_connection', {
                    user_id: this.user_id,
                    username: this.username
                })
            },

            existingUser(username) {
                this.username = username
                this.hasName = true
            }
        },

        created() {
            if (this.user_id == null) {
                this.user_id = Math.random().toString(24)
                localStorage.setItem('uUID', this.user_id)
            } else {
                this.socket.emit('get_existing_client_connection', this.user_id)
            }

            this.socket.on('get_username', function(data) {
                if (data.user_id == this.user_id) {
                    this.username = data.username
                    this.hasName = true
                }
            }.bind(this))
        },

        // mounted() {
        //     this.socket.on('get_username', function(data) {
        //         this.username = data
        //         this.hasName = true
        //     }.bind(this))
        // },

        beforeDestroy() {
            console.log("beforeDestroy")
        }
        
    }
</script>

<style>

</style>
