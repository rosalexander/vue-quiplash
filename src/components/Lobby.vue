<template>
    <div>
        <div class="header">
            LOBBY
        </div>
        <div class="waitingMessage">

            Members

            <ul v-for="member in members">
                    {{ member }}
            </ul>

            Waiting for more players to join...
        </div>

        

        <div class=roundInput>
            
            <div v-if="!hasName">
                <form @submit.prevent="handleEnter">
                    <input type="text" id="roundInput" v-model="username" required min="4"><br>
                    <button type="submit" id="lobbyCreate">Enter Name</button>
                </form>
            </div>

            <!-- <div v-else>
                <h1>{{username}}</h1>
                <h1>{{user_id}}</h1>
            </div> -->

            <button class="btnPin">PIN {{pin}} </button>
            <form @submit.prevent="startGame">
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
                members: [],
                socket : io('http://' + window.location.hostname + ':3000'),
                user_id : localStorage.getItem('uUID'),
                pin: this.$route.params.id
            }
        },

        methods: {
            handleEnter() {
                this.hasName = true
                this.socket.emit('new_client_connection', {
                    user_id: this.user_id,
                    username: this.username
                })
                this.addUser()
            },

            startGame() {
                console.log("Start game")
            },

            addUser() {
                console.log("Adding user to lobby")
                this.socket.emit('add_user_to_lobby', {
                    pin: this.pin,
                    username: this.username
                })
            },

            removeUser() {
                console.log("Removing user from lobby")
                this.socket.emit('remove_user_from_lobby', {
                    pin: this.pin,
                    username: this.username
                })
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
                    this.addUser()
                }
            }.bind(this))

            this.socket.emit('get_users_in_lobby', this.$route.params.id)
            
        },

        mounted() {

            this.socket.on('list_users_in_lobby', function(data) {
              if (this.pin == data.pin) {
                this.members = data.members
              }
              
            }.bind(this))
        },

        beforeDestroy() {
            this.removeUser()
            this.socket.disconnect(true)

        }
        
    }
</script>

<style>
    ul {
        margin-right:2pc;
        text-align: center;
        list-style: inside;
    }
</style>
