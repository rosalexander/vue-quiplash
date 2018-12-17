<template>
  <div id="app">
      <div id="stuff">
        <router-link to="/">Home</router-link>
        <router-link to="/lobby/test">Lobby</router-link>
        <!-- <router-link to="/ready">Ready</router-link> -->
        <router-link to="/chat">Chat</router-link>
      </div>
      <router-view></router-view>
</div>

</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
hr {
    width: 25%;
    border: 1;
    border-top: 2px solid black;
}
input {
    font-family: "Krungthep";
}
.header {
    font-family: "Krungthep";
    font-size: 50px;
    text-align: center;
}

.headerRound {
    font-family: "Krungthep";
    font-size: 50px;
    text-align: center;
    padding: 25px;
    color:white;
}

.waitingMessage {
    font-family: "Krungthep";
    font-size: 40px;
    text-align: center;
    padding: 10px;
}

.roundMessage {
    font-family: "Krungthep";
    font-size: 40px;
    text-align: center;
    padding: 40px;
}

.question {
    font-family: "Krungthep";
    font-size: 40px;
    text-align: center;
    padding-bottom: 2%;
}

#lobbyCreate {
    font-size: 20px;
    background-color: #0CC40E;
    color: black;
    padding: 13px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
}

#lobbyCreate:hover {
    background-color: #77df7c;
    color: white;
    transition: 0.5s;
    
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

.btnPin:hover {
    background-color: #77df7c;
    color: white;
    transition: 0.5s;
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

.li {
    font-family: "Krungthep";
}


/* .card {
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
} */


  #stamp{
    -webkit-animation-name: pulse;
    animation-name: pulse;
    animation-delay:1.5s;
    -webkit-animation-delay:2.5s;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    opacity: 0;
    -webkit-animation-fill-mode:forwards;
     animation-fill-mode:forwards;
     font-family: "Krungthep";
     text-align:center;
     
  }
  
  @-webkit-keyframes pulse{
    0%{
      opacity: 0;
    }
    10%{
      opacity:.50;
      transform-origin: 50% 50%;
      /* transform: rotate(-2deg) scale(5); */
      transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    100%{
      opacity:1;
      /* transform: rotate(-15deg) scale(1); */
    }
  }

  /* .cardRow {
    display: flex;
    justify-content: center;
  } */


.progress-bar {
    width: 506px;
    height: 25px;
    background-color: antiquewhite;
    border-radius: 15px;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 3px;
}

.progress {
    width: 10px;
    height: 20px;
    background-color: #77df7c;
    border-radius: 15px;
    padding: 5px;
}

</style>