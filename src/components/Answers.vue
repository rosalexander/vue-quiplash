 <template>
 <div>
        <div class="headerRound">
            ROUND 1
        </div>
        
        <div class="question">
            "A bumper sticker a<br>
            nudist would have"
        </div>
        <hr>


        <div id="countdown">
            <div id='tiles'>
                <span style = "text-align: center">
                    {{ seconds }}
                </span>
            </div>
            <div class="labels">
                <li style="font-family: 'Krungthep'; font-size: 20px; padding: 3px;">Seconds</li>
            </div>
        </div> 


        <div class="cardRow">
        <button class="card"> Choice 1
        </button>
        <button class="card"> Choice 2
        </button>
        </div>
        <div class="typewriter">
            <div class="player1">
                <h1>Player 1 is ready...</h1>
                <h1>Player 2 is ready...</h1>
            </div>
            <div class="player2">
                <h1>Waiting for Player 3 response...</h1>
                <h1>Waiting for Player 4 response...</h1>
            </div>
        </div>
 </div>
</template>


<script>

    import io from 'socket.io-client'

    export default {
        name: 'Answers',

        data() {
            return {
                user: '',
                hasName: false,
                message: '',
                messages: [],
                members: {},
                socket : io('http://' + window.location.hostname + ':3000'),
                seconds: '5'
            }
        },

        methods: {
            updateTimer: function() {
                if (this.seconds != '0'){
                    this.seconds = (parseInt(this.seconds) - 1).toString();
                }
            }
        },

        created() {
            setInterval(this.updateTimer, 1000)
        }
    }
</script>

<style scoped>
    #countdown{
        position: relative;
        height: 10pc;
    }
</style>
