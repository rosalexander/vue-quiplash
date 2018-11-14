<template>
    <div>
        <div class="header">
            GET READY
        </div>
        <div class="roundMessage">
            Round 1 will begin in...
        </div>
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
    </div>
</template>

<script>
export default {
    name: 'Ready',
    data: function(){
        return {
            seconds: '5',
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

