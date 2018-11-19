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
        <div class="cardRow">
            <form action="">
                <input id="response" type="text" name="response" placeholder="Enter response here...">
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
        margin-bottom: 50px;
        padding-bottom: 50%;
        padding-right: 35%;

    }

    .cardRow {
        text-align: left;
        
    }

    input:focus {
        text-align: left;
    }
    input[type="text"]::-webkit-input-placeholder {
        color: white;
        opacity: 50%;
        
        
    }


</style>