<template>
    <div class="gen-body" style="height:100vh; background:#96C4F9">
        <div class="header">
            GET READY
        </div>
        <div class="roundMessage">
            Round 1 is starting soon...
        </div>
        <!-- <div id="countdown">
            <div id='tiles'>
                <span style = "text-align: center">
                    {{ seconds }}
                </span>
            </div>
            <div class="labels">
                <li style="font-family: 'Krungthep'; font-size: 20px; padding: 3px;">Seconds</li>
            </div>
        </div>  -->
        <div class="progress-bar">

            <div class="progress" id="progress"></div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'Ready',
    mounted() {
        this.progress()
    },

    methods: {
        // updateTimer: function() {
        //     if (this.seconds != '0'){
        //         this.seconds = (parseInt(this.seconds) - 1).toString();
        //     }
        // },

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

    // created() {
    //     setInterval(this.updateTimer, 1000)
    // }
}
</script>

