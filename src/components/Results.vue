 <template>
 <div>
<div class="headerRound">
            ROUND 1 RESULTS
        </div>
        <div class="question">
            "A bumper sticker a<br>
            nudist would have"
        </div>
        <hr>


        <div class="cardRow">
        <button class="card"> Choice 1
        </button>

        <button class="card"> Choice 2
        </button>
        </div>
        
        <div class="stamp_cl">
            <div id="stamp">
                <h1>Player 1</h1>
            </div>

            <div id="stamp">
                <h1>Player 2</h1>
            </div>

            <div id="stamp">
                <h1>Player 3</h1>
            </div> 

            <div id="stamp">

                <h1>Player 4</h1>
            </div>
        </div>
 </div>
</template>


<script>

    import io from 'socket.io-client';

    export default {
        name: 'Results',

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