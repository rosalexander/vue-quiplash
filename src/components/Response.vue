 <style scoped>
    body {
        background-color: #BF2437;
    }

    form {
        background-color: #BF2437;
    }
    .home {
        height: 110%;
        width: 100%;
        position: absolute;
        background-color: #BF2437;
    }
    .question {
        font-family: "Krungthep";
        font-size: 40px;
        text-align: center;
        padding-bottom: 2%;
        padding: 15px;
        color: white;
        background-color: #BF2437;
    }

    .headerRound {
        font-family: "Krungthep";
        font-size: 50px;
        text-align: center;
        padding: 25px;
        color:white;
        background-color: #BF2437;
    }

    hr {
        border: 2px solid white;
    }

    .headerRound {
        font-family: "Krungthep";
        font-size: 50px;
        text-align: center;
        padding: 25px;
        color:white;
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

    .cardRow {
        display: flex;
        justify-content: center;
        background-color: #BF2437; 
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 35px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #BF2437;
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

    .progress-bar {
        width: 506px;
        height: 25px;
        background-color: antiquewhite;
        border-radius: 15px;
        /* margin: auto;
        margin-top: 5%;
        margin-bottom: 5%; */
        padding: 3px;     
    }

    .progress {
        width: 10px;
        height: 20px;
        background-color: #77df7c;
        border-radius: 15px;
        padding: 5px;
    }

    .test {
        background-color: #BF2437;
    }
@media screen and (max-width: 812px) {
        body {
        background-color: #BF2437;
    }
    .home {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #BF2437;
    }
    .question {
        font-family: "Krungthep";
        font-size: 30px;
        text-align: center;
        padding-bottom: 2%;
        color: white;
        background-color: #BF2437;
    }

    .headerRound {
        font-family: "Krungthep";
        font-size: 50px;
        text-align: center;
        padding: 25px;
        color:white;
        background-color: #BF2437;
    }

    hr {
        border: 2px solid white;
    }

    .headerRound {
        font-family: "Krungthep";
        font-size: 30px;
        text-align: center;
        padding: 25px;
        color:white;
    }

    .question {
        font-family: "Krungthep";
        font-size: 25px;
        text-align: center;
        padding: 10px;
        background-color: #BF2437;
    }

    .btnPin {
        width: 40%;
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

    .cardRow {
        display: flex;
        justify-content: center;
        background-color: #BF2437; 
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 25px;
        font-size: 35px;
        text-align: center;
        font-family: "Krungthep";
        background-color: rgb(255, 255, 255);
        color: black;
        padding: 3%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #BF2437;
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

    .progress-bar {
        width: 206px;
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
        width: 0px;
        height: 20px;
        background-color: #77df7c;
        border-radius: 15px;
        padding: 5px;
    }


}
</style>

<template>
    <div class="home">
        <div class="headerRound">
            ANSWER ROUND
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
                <br>
                Answer each prompt as best as possible before time 
                runs out! Afterwards, everyone will vote for their favorite answer.
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
                // users_prompt: this.$store.state.users_prompts,
                index: this.$store.state.answers.length,
                answers: this.$store.state.answers,
                response: '',
                admin: false,
                pin: this.$route.params.id,
                interval: null,
                window: {
                    width: 0,
                    height: 0
                }
            }
        },

        created() {

            window.addEventListener('resize', this.handleResize)
            this.handleResize();

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
                // for (let i = 0; i < data.prompts.length; i++) {

                //     if (data.users_prompt[i].includes(this.username)) {
                //         this.prompts.push(data.prompts[i])
                //         this.prompt_ids.push(data.prompt_ids[i])
                //         this.users_prompt.push(data.users_prompt[i])
                //     }
                // }
                // if (this.admin) {
                this.prompts = data.prompts;
                this.prompt_ids = data.prompt_ids;
                // this.users_prompt = data.users_prompt;
                // }
                
                console.log(data);
                console.log("prompts", this.prompts)
                console.log("prompts_ids", this.prompts_ids)
                // console.log("users_prompt", this.users_prompt)
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
                var increment = 5;
                var limit = 500;
                if (this.window.width <= 812) {
                    increment = 2;
                    limit = 200;
                }
                var prg = document.getElementById('progress');
                var counter = this.$store.state.counter;
                var progress = this.$store.state.progress;
                this.interval = setInterval(frame.bind(this), 400);

                function frame() {
                    // console.log(counter, progress)
                    if(progress >= limit && counter >= 100) {
                        this.$store.commit('clear_timer')
                        clearInterval(this.interval);
                        router.push({name: 'Results'})

                    }
                    else {
                        this.$store.commit('increment_timer', increment)
                        progress += increment;
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
                
            },

            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            }

            
        },


        beforeDestroy() {
            clearInterval(this.interval)
            this.socket.disconnect(true)
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize)
            clearInterval(this.interval)
        }
    }
</script>

