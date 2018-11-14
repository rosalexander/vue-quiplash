#!/bin/bash

screen -dmS server
screen -dmS frontend
screen -dmS redis-server

screen -S frontend -X stuff $'npm run dev\n'
screen -S server -X stuff $'node server/app.js\n'
screen -S redis-server -X stuff $'redis-server\n'
