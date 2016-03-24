FROM diko316/debnode:latest

EXPOSE 8080

# add webpack tools
ADD ./tools $APP_TOOLS

RUN "$APP_TOOLS/installer/install.sh" \
        build-essential && \
    npm install -g -ddd \
        webpack \
        webpack-dev-server && \
    cd "$PROJECT_ROOT" && \
    npm install -dd \
        webpack \
        less \
        less-loader \
        css-loader \
        babel-core \
        babel-loader \
        style-loader \
        html-loader \
        eslint \
        eslint-loader \
        babel-eslint \
        image-webpack-loader && \
    "$APP_TOOLS/installer/uninstall.sh" \
        build-essential && \
    rm -rf /root/.node-gyp && \
    "$APP_TOOLS/installer/cleanup.sh"

CMD "$APP_TOOLS/webpack/run.sh"
