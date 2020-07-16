FROM alpine:3.10
LABEL maintainer="Pedro Sanders <fonosterteam@fonoster.com>"

COPY . /jwthelper
WORKDIR /jwthelper

RUN apk add --update nodejs=10.19.0-r0 npm=10.19.0-r0 ;\
  npm -g install . ; \
  npm rebuild ; \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

CMD ["/bin/sh", "-c", "run-jwthelper"]
