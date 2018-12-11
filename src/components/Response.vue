 <template>
 <div class="response-body" style="height:100vh; background:#BF2437">
        <div class="headerRound">
            ROUND 1
        </div>
        <div v-if="!admin">
            <div v-if="this.index < this.prompts.length">
                <div class="question">
                    {{prompts[index]}}
                </div>
                <hr>
                <div class="cardRow">
                    <form action="">
                        <textarea rows="10" cols="30" maxlength= 140 id="response" v-model="response" placeholder="Enter response here..."></textarea>
                    </form>
                </div>

                <form @submit.prevent="submit" >
                    <input type="submit" class="btnPin" value="Submit">
                </form>
            </div>
                
            <div v-else>
                <div class="question">
                    All prompts have been answered. Sit tight and relax!
                </div>
            </div>

        </div>
        <div v-else>
            <div class="question">
                Rules
                <br>
                Answer each prompt as best as possible before time runs out! Afterwards, everyone will vote for their favorite answer.
            </div>
        </div>

        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>

 </div>
</template>


<script>

    import io from 'socket.io-client';
    import router from '@/router';

    export default {
        name: 'Response',

        data() {
            return {
                user_id : localStorage.getItem('uUID'),
                socket : io('http://' + window.location.hostname + ':3000'),
                username: '',
                members: [],
                prompts: this.$store.state.prompts,
                prompt_ids: this.$store.state.prompt_ids,
                index: this.$store.state.answers.length,
                answers: this.$store.state.answers,
                response: '',
                admin: false,
                pin: this.$route.params.id,
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
                        if (!this.$store.state.prompts_exists) {
                            this.socket.emit('set_prompts', this.pin)
                        }
                    }
                }
            }.bind(this))
        },

        mounted() {
            this.socket.on('get_prompts', function(data) {       
                this.$store.commit('set_prompts', data)
                this.prompts = data.prompts;
                this.prompt_ids = data.prompt_ids;
                console.log(this.prompts);
                this.$store.commit('clear_timer')
                // this.progress()
            }.bind(this))
            
            this.progress()
            
        },

        watch: {
            // prompts: function() {
            //     this.progress()
            // }
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
                var counter = this.$store.state.counter;
                var progress = this.$store.state.progress;
                var id = setInterval(frame.bind(this), 300);

                function frame() {
                    // console.log(counter, progress)
                    if(progress >= 500 && counter >= 100) {
                        this.$store.commit('clear_timer')
                        clearInterval(id);
                        router.push({name: 'Results'})

                    }
                    else {
                        this.$store.commit('increment_timer')
                        progress += 5;
                        counter += 1;
                        prg.style.width = progress + 'px';
                    }
                }
            },

            submit() {
                // this.answers.push(this.response)
                this.$store.commit('submit_answer', this.response)
                console.log({prompt_id: this.prompt_ids[this.index], answer: this.response, username: this.username, user_id: this.user_id})
                this.socket.emit('submit_answer', {prompt_id: this.prompt_ids[this.index], answer: this.response, username: this.username, user_id: this.user_id, pin: this.pin})
                this.index += 1
                this.response = ''
            },

            end_round() {
                this.$store.commit('reset_prompts')
                this.$store.commit('clear_timer')
            },

            get_responses() {
                
            }

            
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