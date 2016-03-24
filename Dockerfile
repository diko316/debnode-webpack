FROM diko316/debnode:latest

ENV APP_PORT=8080

EXPOSE $APP_PORT

# add webpack tools
ADD ./tools $APP_TOOLS

RUN "$APP_TOOLS/installer/npminstall.sh" \
        --apt \
            build-essential \
        --apt-permanent \
            libpng-dev \
            libpng12-dev \
        --global \
            webpack \
            webpack-dev-server \
        --local \
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
            image-webpack-loader

CMD "$APP_TOOLS/webpack/run.sh"
