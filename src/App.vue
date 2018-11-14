<template>
  <div id="app">
      <div id="stuff">
        <router-link to="/">Home</router-link>
        <router-link to="/lobby/test">Lobby</router-link>
        <router-link to="/ready">Ready</router-link>
        <router-link to="/chat">Chat</router-link>
      </div>
      <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
    body{
        background: #96C4F9;
    }
    input, button {
        font-family: "Krungthep";
    }
    .header {
        font-family: "Krungthep";
        font-size: 63px;
        text-align: center;
        padding: 25px;
    }

    .waitingMessage {
        font-family: "Krungthep";
        font-size: 40px;
        text-align: center;
        padding: 10px;
        margin-top: 20%;
    }

    .roundMessage {
        font-family: "Krungthep";
        font-size: 40px;
        text-align: center;
        padding: 40px;
    }

    .title {
        font-family: "Krungthep";
        font-size: 30px;
        text-align: center;
        margin-top: 10%;
    }

    .roundInput {
        text-align: center;
        padding: 15px;
    }
    #roundInput {
        font-family: "Krungthep";
        font-size: 20px;
        text-align: center;
        width: 90px;
        margin-top: 1%;
    }

    #lobbyCreate {
        width: 10%;
        font-size: 20px;
        background-color: #0CC40E;
        color: black;
        padding: 13px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 4%;
    }

    #lobbyCreate:hover {
        background-color: #77df7c;
        color: white;
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

    input[type=submit]:hover {
        background-color: #77df7c;
        color: white;
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

    /* The snackbar - position it at the bottom and in the middle of the screen */
    #pinToast {
        visibility: hidden; /* Hidden by default. Visible on click */
        min-width: 220px; /* Set a default minimum width */
        margin-left: -125px; /* Divide value of min-width by 2 */
        background-color: rgb(46, 46, 46); /* Black background color */
        color: #fff; /* White text color */
        text-align: center; /* Centered text */
        border-radius: 2px; /* Rounded borders */
        padding: 16px; /* Padding */
        position: fixed; /* Sit on top of the screen */
        z-index: 1; /* Add a z-index if needed */
        left: 50%; /* Center the snackbar */
        bottom: 30px; /* 30px from the bottom */
        font-family: "Krungthep";
        font-size: 20px;
    }

    /* Show the snackbar when clicking on a button (class added with JavaScript) */
    #pinToast.show {
        visibility: visible; /* Show the snackbar */
        /* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
    However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    /* Animations to fade the snackbar in and out */
    @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
    }

    @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
    }

    /* body{ 
        font: normal 13px/20px Arial, Helvetica, sans-serif; word-wrap:break-word;
        color: #eee;
        background: #353535;
    } */

    #countdown{
        width: 200px;
        height: 170px;
        text-align: center;
        font-family: "Krungthep";
        background: #222;
        background-image: -webkit-linear-gradient(top, #222, #333, #333, #222); 
        background-image:    -moz-linear-gradient(top, #222, #333, #333, #222);
        background-image:     -ms-linear-gradient(top, #222, #333, #333, #222);
        background-image:      -o-linear-gradient(top, #222, #333, #333, #222);
        border: 1px solid #111;
        border-radius: 5px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
        margin: auto;
        padding: 24px 0;
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
    }

    #countdown:before{
        content:"";
        width: 8px;
        height: 65px;
        font-family: "Krungthep";
        background: #444;
        background-image: -webkit-linear-gradient(top, #555, #444, #444, #555); 
        background-image:    -moz-linear-gradient(top, #555, #444, #444, #555);
        background-image:     -ms-linear-gradient(top, #555, #444, #444, #555);
        background-image:      -o-linear-gradient(top, #555, #444, #444, #555);
        border: 1px solid #111;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        display: block;
        position: absolute;
        top: 48px; left: -10px;
    }

    #countdown:after{
        content:"";
        width: 8px;
        height: 65px;
        font-family: "Krungthep";
        background: #444;
        background-image: -webkit-linear-gradient(top, #555, #444, #444, #555); 
        background-image:    -moz-linear-gradient(top, #555, #444, #444, #555);
        background-image:     -ms-linear-gradient(top, #555, #444, #444, #555);
        background-image:      -o-linear-gradient(top, #555, #444, #444, #555);
        border: 1px solid #111;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        display: block;
        position: absolute;
        top: 48px; right: -10px;
    }

    #countdown #tiles{
        font-family: "Krungthep";
        position: relative;
        z-index: 1;
    }

    #countdown #tiles > span{
        width: 92px;
        max-width: 92px;
        font: bold 48px 'Droid Sans', "Krungthep", sans-serif;
        text-align: center;
        color: #111;
        background-color: #ddd;
        background-image: -webkit-linear-gradient(top, #bbb, #eee); 
        background-image:    -moz-linear-gradient(top, #bbb, #eee);
        background-image:     -ms-linear-gradient(top, #bbb, #eee);
        background-image:      -o-linear-gradient(top, #bbb, #eee);
        border-top: 1px solid #fff;
        border-radius: 3px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.7);
        margin: 0 7px;
        padding: 18px 0;
        display: inline-block;
        position: relative;
    }

    .li {
        font-family: "Krungthep";
    }

    #countdown #tiles > span:before{
        content:"";
        width: 100%;
        height: 13px;
        font-family: "Krungthep";
        background: #111;
        display: block;
        padding: 0 3px;
        position: absolute;
        top: 41%; left: -3px;
        z-index: -1;
    }

    #countdown #tiles > span:after{
        content:"";
        width: 100%;
        height: 1px;
        background: #eee;
        font-family: "Krungthep";
        border-top: 1px solid #333;
        display: block;
        position: absolute;
        top: 48%; left: 0;
    }

    #countdown .labels{
        font-family: "Krungthep";
        width: 100%;
        height: 25px;
        text-align: center;
        position: absolute;
        bottom: 8px;
        
    }

    #countdown .labels li{
        font-family: "Krungthep";
        width: 102px;
        font: bold 15px 'Droid Sans', Arial, sans-serif;
        color: #f47321;
        text-shadow: 1px 1px 0px #000;
        text-align: center;
        text-transform: uppercase;
        display: inline-block;
    }
</style>