<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card mt-3">
            <div class="card-body">
                <div class="card-title">
                    <h3>Chat Group</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="messages" v-for="(msg, index) in messages" :key="index">
                        <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <form @submit.prevent="sendMessage">
                    <div class="gorm-group">
                        <label for="user">User:</label>
                        <input type="text" v-model="user" class="form-control">
                    </div>
                    <div class="gorm-group pb-3">
                        <label for="message">Message:</label>
                        <input type="text" v-model="message" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success">Send</button>
                </form>
            </div>
        </div>
        </div>
      </div>
    </div>
</template>


<script>
import io from 'socket.io-client';

export default {
    name: "Chat",
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            members: {},
            socket : io('http://' + window.location.hostname + ':3000')
        }
    },
    methods: {

        sendMessage(e) {
            e.preventDefault();
            
            if (this.message.length > 0) {
                this.socket.emit('send_message', {
                    user: this.user,
                    message: this.message
                });
                this.message = ''
            }
        }


    },
    mounted() {
        this.socket.on('message', function(message) {
            console.log(message);
            this.messages.push(message);
        }.bind(this));

        this.socket.on('member_add', function(member) {
            pass;
        }.bind(this));

        this.socket.on('member_delete', function(socket_id) {
            pass;
        }.bind(this));

        this.socket.on('message_history', function(messages) {
            this.messages = messages;
            console.log(messages);
        }.bind(this));

        this.socket.on('member_history', function(members) {
            pass;
        }.bind(this));
    },

    beforeDestroy() {
        this.socket.disconnect(true)
    }
}
</script>

<style>

</style>
