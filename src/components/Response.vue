 <template>
 <div>
        <div>
            {{user_id}}
            {{username}}
            {{pin}}
        </div>

        <div class="headerRound">
            ROUND 1
        </div>
        <div class="question">
            "A test prompt"
        </div>
        <hr>
        <div class="cardRow">
            <form action="">
                <textarea rows="10" cols="30" maxlength= 140 id="response" placeholder="Enter response here..."></textarea>
            </form>

        </div>

        <div>
            <button class="btnPin">SUBMIT</button>
        </div>
 </div>
</template>


<script>

    import io from 'socket.io-client';

    export default {
        name: 'Response',

        data() {
            return {
                user_id : localStorage.getItem('uUID'),
                socket : io('http://' + window.location.hostname + ':3000'),
                username: '',
                members: [],
                prompts: [],
                pin: this.$route.params.id
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
                    this.addUser();
                }
            }.bind(this))

            this.socket.emit('set_prompts', this.pin)
        },

        mounted() {
            this.socket.on('get_prompts', function(data) {
                console.log(data);
            })
        },



        methods: {

            addUser() {
                console.log("Adding user to lobby")
                this.socket.emit('add_user_to_lobby', {
                    pin: this.pin,
                    username: this.username,
                    user_id: this.user_id
                })
            },
        },


        beforeDestroy() {
            this.socket.disconnect(true)
        }
    }
</script>

<style>
    body {
        background: #BF2437;
    }

    .question {
    font-family: "Krungthep";
    font-size: 40px;
    text-align: center;
    padding-bottom: 2%;
    color: white;
}

    hr {
        border: 2px solid white;
    }

    .btnPin {
        width: 10%;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: #F5A623;
        color: black;
        padding: 13px;
        border: none;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        margin: auto;
        cursor: pointer;
        
    }

    #response {
        background-color: black;
        color:white;
        font-family: "Krungthep";
        height: 50%;
        margin-top:20%;

    }
    textarea::-webkit-input-placeholder {
        color: white;
        font-family: "Krungthep";
    }

    #myProgress {
        width: 100%;
        background-color: grey;
    }
    #myBar {
        width: 1%;
        height: 30px;
        background-color: green;
    }



</style>