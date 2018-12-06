 <template>
 <div class="response-body" style="height:100vh; background:#BF2437">
        <div>
            {{user_id}}
            {{username}}
            {{pin}}
        </div>

        <div class="headerRound">
            ROUND 1
        </div>
        <div v-if="!admin">
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
        
        <div>
            <button class="btnPin">SUBMIT</button>
        </div>

        <div class="progress-bar">
            <div class="progress" id="progress"></div>
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
                admin: false,
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
                    if (this.username === 'Admin') {
                        this.admin = true;
                        this.socket.emit('set_prompts', this.pin)
                    }
                }
            }.bind(this))
        },

        mounted() {
            this.socket.on('get_prompts', function(data) {
                console.log(data);
            })

            this.progress()
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

            progress() {
                var prg = document.getElementById('progress');
                var counter = 5;
                var progress = 25;
                var id = setInterval(frame, 150);

                function frame() {
                    if(progress == 500 && counter == 100) {
                        clearInterval(id);
                    }
                    else {
                        progress += 5;
                        counter += 1;
                        prg.style.width = progress + 'px';
                    }
                }
            },

            
        },


        beforeDestroy() {
            this.socket.disconnect(true)
        }
    }
</script>

<style>
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





</style>