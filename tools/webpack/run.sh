#!/bin/sh

CURRENT_DIR=$(pwd)
IP_ADDR=$(ip -4 addr show eth0 | grep -Eo 'inet [^0-9]*([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]+\.)+[0-9]+')

"${APP_TOOLS}/watcher/watch-source.sh"

if [ -d "${PROJECT_ROOT}" ] && [ -f "${PROJECT_ROOT}/webpack.config.js" ]; then
    cd "${PROJECT_ROOT}"
    
    webpack --display-modules --display-chunks
    webpack-dev-server --inline --hot --port "${APP_PORT}" --host "${IP_ADDR}"
    
    cd "${CURRENT_DIR}"
fi



