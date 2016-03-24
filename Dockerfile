FROM diko316/debnode:latest


# add gulp tools
ADD ./tools $APP_TOOLS

RUN "$APP_TOOLS/installer/install.sh" \
        build-essential && \
    npm install -g -ddd \
        webpack \
        webpack-dev-server && \
    "$APP_TOOLS/installer/uninstall.sh" \
        build-essential && \
    rm -rf /root/.node-gyp && \
    "$APP_TOOLS/installer/cleanup.sh"

CMD "$APP_TOOLS/webpack/run.sh"
