<style scoped>
    ul {
        margin-right: 3pc;
        text-align: center;
        /* list-style: inside; */
        color: rgb(245, 60, 57);
    }

    body {
        background-color: #96C4F9;
    }
    .home {
        height: 110%;
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

    .cardRow {
        width: 100%;
        background-color: #96C4F9;

    }

    .stampRow {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: block;
    }

    .card2 {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        display: block;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background-color: #77df7c;
        color: white;
    }

    .card:focus {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background-color: #77df7c;
        color: white;
    }

      #stamp{
        -webkit-animation-name: pulse;
        animation-name: pulse;
        animation-delay:1.5s;
        -webkit-animation-delay:2.5s;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        opacity: 0;
        -webkit-animation-fill-mode:forwards;
        animation-fill-mode:forwards;
        font-family: "Krungthep";
        text-align:center;
  }

    #stamp2{
        -webkit-animation-name: pulse;
        animation-name: pulse;
        animation-delay:1.5s;
        -webkit-animation-delay:2.5s;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        opacity: 0;
        -webkit-animation-fill-mode:forwards;
        animation-fill-mode:forwards;
        font-family: "Krungthep";
        text-align:center;
  }

  .fas {
      color: rgba(242, 203, 11, 0.989);
  }

  .fa-crown  {
      color: rgba(242, 203, 11, 0.989);
  }
  
  @-webkit-keyframes pulse{
    0%{
      opacity: 0;
    }
    10%{
      opacity:.50;
      transform-origin: 50% 50%;
      transform: rotate(-2deg) scale(5);
      transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    100%{
      opacity:1;
      /* transform: rotate(-15deg) scale(1); */
    }
  }

@media screen and (max-width: 812px) {
        ul {
        margin-right: 3pc;
        text-align: center;
        /* list-style: inside; */
        color: rgb(245, 60, 57);
    }

    body {
        background-color: #96C4F9;
    }
    .home {
        height: 110%;
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

    .headerRound {
        font-family: "Krungthep";
        font-size: 30px;
        text-align: center;
        padding: 25px;
        color:white;
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

    .question {
        font-family: "Krungthep";
        font-size: 25px;
        text-align: center;
        padding: 15px;
        background-color: #96C4F9;
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

    .cardRow {
        width: 100%;
        background-color: #96C4F9;

    }

    .stampRow {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: block;
    }

    .card2 {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 20px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        display: block;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background-color: #77df7c;
        color: white;
    }

    .card:focus {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background-color: #77df7c;
        color: white;
    }

      #stamp{
        -webkit-animation-name: pulse;
        animation-name: pulse;
        animation-delay:1.5s;
        -webkit-animation-delay:2.5s;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        opacity: 0;
        -webkit-animation-fill-mode:forwards;
        animation-fill-mode:forwards;
        font-family: "Krungthep";
        text-align:center;
  }

    #stamp2{
        -webkit-animation-name: pulse;
        animation-name: pulse;
        animation-delay:1.5s;
        -webkit-animation-delay:2.5s;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        opacity: 0;
        -webkit-animation-fill-mode:forwards;
        animation-fill-mode:forwards;
        font-family: "Krungthep";
        text-align:center;
  }

    input[type=submit] {
        width: 10%;
        font-size: 20px;
        background-color: #0CC40E;
        color: black;
        padding: 13px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

  .fas {
      color: rgba(242, 203, 11, 0.989);
  }

  .fa-crown  {
      color: rgba(242, 203, 11, 0.989);
  }
  
  @-webkit-keyframes pulse{
    0%{
      opacity: 0;
    }
    10%{
      opacity:.50;
      transform-origin: 50% 50%;
      transform: rotate(-2deg) scale(5);
      transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    100%{
      opacity:1;
      /* transform: rotate(-15deg) scale(1); */
    }
  }

      .progress-bar {
        width: 200px;
        height: 20px;
        background-color: antiquewhite;
        border-radius: 15px;
        /* margin: auto;
        margin-top: 5%;
        margin-bottom: 5%; */
        margin-bottom: 10px;
        padding: 3px;  
    }

    .progress {
        width: 10px;
        height: 20px;
        background-color: #77df7c;
        border-radius: 15px;
        padding: 5px;
    }









}


















 </style>
 
 
 <template>
 
 <div class="home">
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
     {{this.$store.state.pin}}
     {{this.$store.state.members}}

    <div class="headerRound" v-if="round_over">
        LEADERBOARD
    </div>
    <div class="headerRound" v-else-if="!show_votes">
            VOTING ROUND
    </div>
    
    <div class="headerRound" v-else>
            AND THE WINNER IS...
    </div>
    <div class="question">
            {{prompts[index]}}
    </div>

    <hr>

    <div class="cardRow">


        <div v-for="(response, index) in responses" :key="index" >
        
            <div v-if="!voted" class="stampRow">
                    <button class="card" id="stamp"  v-on:click="vote(index)"> {{response.answer}}</button>
            </div>

            <div v-else-if="show_votes" class="stampRow">
                <div v-if="winners.includes(response.username)">
                    <button class="card2" id="stamp2" style="background-color:#77df7c;">
                        <i class="fas fa-crown"></i>
                        {{response.answer}}
                        <div><hr style="align: center; width: 60%;"></div>
                        <span style="color: red"><p> {{response.username}} </p></span>
                        <p> {{responses_scores[index]}} votes!</p>
                    </button> 
                </div>
                <div v-else>
                <button class="card2" id="stamp2"> 
                    {{response.answer}}
                    <div><hr style="align: center; width: 60%;"></div>
                    <span style="color: red"><p> {{response.username}} </p></span>
                    <p> {{responses_scores[index]}} votes!</p>
                </button>
                </div>
            </div>
        </div>
    </div>

    <div class="question" v-if="voted">
        <div v-if="!show_votes">You have submitted your vote!</div>
        <div v-else>Next vote starting...</div>
    </div>

    <div class="question" v-if="round_over">
        <div v-for="(member, index) in Object.keys(members)" :key="index">
            {{member}}: {{members[member]}} wins
        </div>
        <button id="lobbyCreate" type="submit" v-on:click="return_to_lobby"> 
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
                members: this.$store.state.members,
                prompts: this.$store.state.prompts,
                prompt_ids: this.$store.state.prompt_ids,
                index: this.$store.state.votes.length,
                answers: this.$store.state.answers,
                admin: false,
                pin: this.$store.state.pin,
                all_responses: [],
                responses: [],
                responses_scores: [],
                winners: [],
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
                    this.winners = data.winners
                    this.winners.forEach((winner) => {
                        this.$store.commit('add_win', {member: winner})
                    })
                }

                this.members = this.$store.state.members
                console.log(this.members, "members")
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
                this.interval = setInterval(frame.bind(this), 50);

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
                            this.sleep(10000000).then(() => {
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