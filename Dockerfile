FROM diko316/debnode:latest

ENV APP_PORT=8080

EXPOSE $APP_PORT

# add webpack tools
ADD ./tools $APP_TOOLS

# autobuild gulp stack
RUN "$APP_TOOLS/autobuild.sh" webpack

#ADD package.json /tmp/package.json
#ADD bower.json /tmp/bower.json

#RUN "$APP_TOOLS/installer/npminstall.sh" \
#        --apt-permanent \
#            libpng-dev \
#            libpng12-dev \
#        --global \
#            webpack \
#            webpack-dev-server

#WORKDIR $PROJECT_ROOT

CMD "$APP_TOOLS/webpack/run.sh"
