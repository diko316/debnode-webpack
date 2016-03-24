#!/bin/sh

CURRENT_DIR=$(pwd)

"${APP_TOOLS}/watcher/watch-source.sh"


if [ -d "${PROJECT_ROOT}" ] && [ -f "${PROJECT_ROOT}/webpack.config.js" ]; then
    cd "${PROJECT_ROOT}"
    
    webpack --display-modules --display-chunks
    webpack-dev-server --inline --hot
    
    cd "${CURRENT_DIR}"
fi



