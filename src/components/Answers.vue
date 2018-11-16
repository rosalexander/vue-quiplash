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
        <button class="card"> Choice 1
        </button>
        <button class="card2"> Choice 2
        </button>
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

    import io from 'socket.io-client';

    export default {
        name: 'Answers',

        data() {
            return {
                user: '',
                hasName: false,
                message: '',
                messages: [],
                members: {},
                socket : io('http://' + window.location.hostname + ':3000')
            }
        },

        methods: {
            handleEnter() {
                this.hasName = true;
            }
        }
    }
</script>