<template>
    <div class="gen-body" style="height:100vh; background:#96C4F9">
        <div class="header">
            LOBBY
            <br>
            <button class="btnPin">PIN: {{pin}} </button>

            <div v-if="admin">
                <h2>You are the admin. Your screen will be used to display the game. Admins will not play the game.</h2>
            </div>
        </div>

        
        
        <div class="waitingMessage">

            Members

            <br>

            <ul v-for="member in members" :key="member">
                    {{ member }}
            </ul>

            Waiting for more players to join...
        </div>

        

        <div class="roundInput" style="height:100vh; background:#96C4F9">
            <div v-if="!hasName">
                <form @submit.prevent="handleEnter">
                    <input type="text" id="roundInput" v-model="username" required min="4"><br>
                    <button type="submit" id="lobbyCreate">ENTER NAME</button>
                </form>
                <br>
            </div>

            <!-- <div v-else>
                <h1>{{username}}</h1>
                <h1>{{user_id}}</h1>
            </div> -->
            <div v-else>
                <form @submit.prevent="rename">
                    <input type="submit" value="RENAME">
                </form>
                <br>
            </div>

            <form @submit.prevent="ready">
                <input type="submit" value="READY">
            </form>

            <br>

            <form @submit.prevent="startGame">
                <input type="submit" value="START GAME">
            </form>
        </div> 
    </div>
</template>

<script>

    import io from 'socket.io-client'
    import router from '@/router'

    export default {
        name: 'Lobby',

        data() {
            return {
                username: '',
                hasName: false,
                message: '',
                messages: [],
                members: [],
                socket: io('http://' + window.location.hostname + ':3000'),
                socket_id: null,
                user_id : localStorage.getItem('uUID'),
                pin: this.$route.params.id,
                admin: false
            }
        },

        methods: {
            handleEnter() {

                if (!this.members.includes(this.username)) {
                    this.hasName = true
                    this.socket.emit('new_client_connection', {
                        user_id: this.user_id,
                        username: this.username
                    })
                    this.addUser()
                } else {
                    alert("Username already taken")
                }
            },

            startGame() {
                console.log("Start game")
                this.socket.emit('start_game')
            },

            rename() {
                this.hasName = false;
                this.removeUser();
            },

            ready() {

            },

            addUser() {
                console.log("Adding user to lobby")
                this.socket.emit('add_user_to_lobby', {
                    pin: this.pin,
                    username: this.username,
                    user_id: this.user_id
                })
            },

            removeUser() {
                console.log("Removing user from lobby")
                this.socket.emit('remove_user_from_lobby', {
                    pin: this.pin,
                    username: this.username,
                    user_id: this.user_id
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

            this.socket.on('connect', () => {
                this.socket_id = this.socket.id
                console.log(this.socket_id)
            })

            this.socket.on('begin_disconnect', () => {
                console.log("Removing user from lobby")
                this.socket.emit('remove_user_from_lobby', {
                    pin: this.pin,
                    username: this.username,
                    user_id: this.user_id
                })
            })

            this.socket.on('list_users_in_lobby', function(data) {
              if (this.pin == data.pin) {
                this.members = data.members
                console.log(this.members)
              }

            }.bind(this))

            this.socket.on('get_admin_in_lobby', function(data) {
                if (this.pin == data.pin) {
                    if (this.user_id == data.user_id) {
                        this.admin = true
                    } else {
                        this.admin = false
                    }
                }
            }.bind(this))

            this.socket.on('start_game', function() {
                router.push({name: 'Response', prams: {id: this.pin}})
            })
        },

        beforeDestroy() {
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
