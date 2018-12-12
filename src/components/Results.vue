 <template>
 <div class="gen-body" style="height:100vh; background:#96C4F9">
     {{this.$store.state.pin}}
    <div class="headerRound" v-if="!show_votes">
            ROUND 1 VOTE!
    </div>
    <div class="headerRound" v-else>
            AND THE WINNER IS...
    </div>
    <div class="question">
            {{prompts[index]}}
    </div>

    <hr>

    <div v-if="!voted">
        <div class="cardRow" v-for="(response, index) in responses" :key="index" >
            <button class="card" id="stamp"  v-on:click="vote(index)"> {{response.answer}}
            </button>
        </div>
    </div>

    <div v-else-if="show_votes">
        <div class="cardRow" v-for="(response, index) in responses" :key="index" >
            <button class="card" id="stamp"> 
                {{response.answer}}
                <p> By {{response.username}} </p>
                <p> {{responses_scores[index]}} votes!</p>
                
            </button>
        </div>
    </div>

    <div class="question" v-else-if="voted">
        <h1 v-if="!show_votes">You have submitted your vote!</h1>
        <h1 v-else>Next vote starting...</h1>
    </div>

    <div class="question" v-if="round_over">
        <h1>The round has finished</h1>
        <button type="submit" v-on:click="return_to_lobby"> 
            Return to Lobby
        </button>
    </div>



    <div class="progress-bar" v-if="!round_over">
        <div class="progress" id="progress"></div>
    </div>

 </div>

</template>


<script>

    import io from 'socket.io-client'
    import router from '@/router'

    export default {
        name: 'Results',

        data() {
            return {
                user_id : localStorage.getItem('uUID'),
                socket : io('http://' + window.location.hostname + ':3000'),
                username: '',
                members: [],
                prompts: this.$store.state.prompts,
                prompt_ids: this.$store.state.prompt_ids,
                index: this.$store.state.votes.length,
                answers: this.$store.state.answers,
                admin: false,
                pin: this.$store.state.pin,
                all_responses: [],
                responses: [],
                responses_scores: [],
                voted: false,
                show_votes: false,
                round_over: true,
                interval: null
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
                        
                    }

                    this.socket.emit('set_responses', this.pin)
                }
            }.bind(this))

            this.socket.on('get_responses', function(data) {
                this.all_responses = data
                console.log(this.all_responses, "created")
                console.log(this.all_responses[0], "created")
                this.get_responses()
            }.bind(this))
        },

        mounted() {
            
            if(this.index < this.prompts.length) {
                this.round_over = false;
                this.sleep(3000).then(() => {this.progress()})
            }

            console.log(this.index, "index")

            this.socket.on('get_scores', function(data) {
                console.log(data, "get scores")
                console.log(this.pin == data.pin)
                if (this.pin == data.pin) {
                    this.responses_scores = data.scores
                }
            }.bind(this))
            
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

            get_responses() {
                this.responses = []
                this.scores = []
                let prompt_id = this.prompt_ids[this.index]
                this.all_responses.forEach((response) => {
                    if (response.prompt_id == prompt_id) {
                        this.responses.push(response)
                        console.log(response)
                    }
                })
            },

            progress() {
                var prg = document.getElementById('progress');
                var counter = this.$store.state.counter;
                var progress = this.$store.state.progress;
                this.interval = setInterval(frame.bind(this), 150);

                function frame() {
                    // console.log(counter, progress)
                    if(progress >= 500 && counter >= 100) {
                        this.$store.commit('clear_timer')
                        
                        if(this.index < this.prompts.length) {
                            clearInterval(this.interval)
                            if (!this.voted) {
                                this.$store.commit('submit_vote', null)
                            }

                            this.voted = true;
                            
                            this.sleep(100).then(() => {
                                this.show_votes = true;
                                
                                this.set_scores(this.responses)
                                
                            })
                            this.sleep(10000).then(() => {
                                this.show_votes = false

                                this.sleep(1000).then(() => {
                                    this.voted = false
                                    this.index += 1
                                    this.get_responses()
                                    this.show_votes = false

                                    this.sleep(3000).then(() => {
                                        if (this.index < this.prompts.length) {
                                            this.progress()
                                        } else {
                                            this.round_over = true
                                        }
                                    })
                                })
                                
                            })
                        }
        
                    }
                    else {
                        this.$store.commit('increment_timer')
                        progress += 5;
                        counter += 1;
                        prg.style.width = progress + 'px';
                    }
                }
            },

            vote(index) {
                this.$store.commit('submit_vote', this.responses[index])
                this.socket.emit('submit_vote', this.responses[index])
                this.voted = true;
            },
            
            set_scores(responses) {
                this.socket.emit('set_scores', {responses: responses, pin: this.pin})
                console.log("score setting")
            },

            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            return_to_lobby() {
                router.push({ path: `/lobby/${this.pin}` })
            }
        },

        watch: {
            index: function() {
                if (this.index >= this.prompts.length) {
                    this.round_over = true
                }
            }
        },

        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>