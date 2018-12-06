<template>
    <div>
        {{user_id}}
        {{username}}
        {{pin}}
    </div>
</template>
<script>

import io from 'socket.io-client';

export default {
    
    name: 'Game',
    data() {
        return {
            user_id : localStorage.getItem('uUID'),
            socket : io('http://' + window.location.hostname + ':3000'),
            username: '',
            members: [],
            pin: this.$route.params.id
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
    },


    beforeDestroy() {
        this.socket.disconnect(true)
    }

}
</script>
<style>

</style>
