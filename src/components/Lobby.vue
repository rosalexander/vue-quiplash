<style scoped>
    ul {
        margin-right: 3pc;
        text-align: center;
        /* list-style: inside; */
        color: rgb(245, 60, 57);
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
    }    

    h2 {
        padding: 20px;
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
        margin-bottom: 4%;
    }

    .waitingMessage {
        font-family: "Krungthep";
        font-size: 40px;
        text-align: center;
        padding: 10px;
        background-color: #96C4F9;
    }

    #lobbyCreate {
        font-size: 20px;
        background-color: #0CC40E;
        color: black;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    #lobbyCreate:hover {
        background-color: #77df7c;
        color: white;
        transition: 0.5s;
        
    }
    .btnPin {
        width: 10%;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: #F5A623;
        color: black;
        padding: 13px;
        margin: 50px;
        border: none;
        border-radius: 4px; 
    }
    @media screen and (max-width: 812px) {
        ul {
                margin-right: 3pc;
                text-align: center;
                /* list-style: inside; */
                color: rgb(245, 60, 57);
            }

        .home {
            height: 100%;
            width: 100%;
            position: absolute;
            background-color: #96C4F9;
        }

        .header {
            font-family: "Krungthep";
            font-size: 40px;
            text-align: center;
            background-color: #96C4F9;
        }    

        h2 {
            font-size: 20px;
            padding: 20px;
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
            margin-bottom: 4%;
        }

        .waitingMessage {
            font-family: "Krungthep";
            font-size: 20px;
            text-align: center;
            background-color: #96C4F9;
        }

        #lobbyCreate {
            width: 150px;
            font-size: 15px;
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
        .btnPin {
            width: 200px;
            font-size: 20px;
            text-align: center;
            font-family: "Krungthep";
            background-color: #F5A623;
            color: black;
            padding: 13px;
            margin: 50px;
            border: none;
            border-radius: 4px; 
        }
    }   
</style>

<template>
    <div class="home">
        <div class="header">
            LOBBY
            <br>
            <button class="btnPin">PIN: {{pin}} </button>
            <div v-if="!hasName">
                <form @submit.prevent="handleEnter">
                    <input type="text" autocomplete = "off" id="roundInput" v-model="username" required min="4"><br>
                    <button type="submit" id="lobbyCreate">ENTER NAME</button>
                </form>
                <br>
            </div>
            <div v-else>
                <form @submit.prevent="rename">
                    <input type="submit" id="lobbyCreate" value="RENAME">
                </form>
                <form @submit.prevent="startGame" v-if="admin">
                    <input type="submit" id="lobbyCreate" value="START GAME">
                </form>
            </div>

            <div v-if="admin">
                <h2>You are the <span style="color: yellow;">Admin</span>. Your screen will be used to display the game. Admins will not play the game.</h2>
            </div>
        </div>
        <div class="waitingMessage">
            Members
            <br>
            <ul v-for="member in members" :key="member">
                   <span style="color: yellow;" v-if="member == 'Admin'"> {{ member }}</span>
                   <span style="color: red;" v-else> {{ member }}</span>
            </ul>
            Waiting for more players to join...
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

                if (!this.members.includes(this.username.replace(/^\s+|\s+$/g, ""))) {
                    if (this.username != "Veronica") {

                        this.hasName = true
                        this.socket.emit('new_client_connection', {
                            user_id: this.user_id,
                            username: this.username
                        })
                        this.addUser()
                    } else {
                        alert("The name Veronica is banned")
                    }
                    
                } else {
                    alert("Username already taken")
                }
            },

            startGame() {
                this.socket.emit('set_start_game', {pin: this.pin})
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
                this.$store.commit('set_username', this.username)
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

                    if (this.username === 'Admin') {
                        this.admin = true;
                    }
                }
            }.bind(this))

            this.socket.emit('get_users_in_lobby', this.$route.params.id)
            
        },

        mounted() {

            this.pin = this.$route.params.id
            this.$store.commit('set_pin', this.pin)

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

            this.socket.on('get_start_game', function(data) {
                if (data.pin == this.pin) {
                    this.$store.commit('set_members', this.members)
                    this.$store.commit('reset_prompts')
                    this.$store.commit('clear_timer')
                    router.push({name: 'Response', prams: {id: this.pin}})
                    console.log("Start game")
                }
            }.bind(this))
        },

        watch: {
            username: function() {
                if (this.username == "Admin") {
                    this.admin = true
                } else {
                    this.admin = false
                }
            }
        },

        beforeDestroy() {
            this.socket.disconnect(true)
        }
        
    }
</script>


