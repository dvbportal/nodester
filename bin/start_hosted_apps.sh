#!/bin/bash

cd `dirname $0`

./node-config.js
wait
source ./.nodester.config

ulimit -n 2048
sudo -u cloudnode /usr/local/node-v0.4.12/node $APP_DIR/scripts/start_hosted_apps.js start "$@"
