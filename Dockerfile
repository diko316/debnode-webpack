FROM diko316/debnode:latest

ENV APP_PORT=8080

EXPOSE $APP_PORT

# add webpack tools
ADD ./tools $APP_TOOLS

ADD package.json /tmp/package.json

RUN "$APP_TOOLS/installer/npminstall.sh" \
        --apt \
            build-essential \
        --apt-permanent \
            libpng-dev \
            libpng12-dev \
        --global \
            webpack \
            webpack-dev-server
        #--local \
        #    webpack \
        #    less \
        #    less-loader \
        #    css-loader \
        #    babel-core \
        #    babel-loader \
        #    style-loader \
        #    html-loader \
        #    eslint \
        #    eslint-loader \
        #    babel-eslint \
        #    image-webpack-loader

WORKDIR $PROJECT_ROOT

CMD "$APP_TOOLS/webpack/run.sh"
