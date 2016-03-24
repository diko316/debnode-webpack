#!/bin/sh

CURRENT_DIR=$(pwd)
WP_CONFIG="${PROJECT_ROOT}/webpack.config.js"

"${APP_TOOLS}/watcher/watch-source.sh"


if [ -d "${PROJECT_ROOT}" ] && [ -f "${WP_CONFIG}" ]; then
    cd "${PROJECT_ROOT}"
    
    webpack --display-modules --display-chunks
    webpack-dev-server --inline --hot
    
    cd "${CURRENT_DIR}"
fi



