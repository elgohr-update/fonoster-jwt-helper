FROM fonoster/base
COPY . /scripts
RUN ./install.sh
RUN mkdir -p /home/fonoster/access && chown fonoster /home/fonoster/access
USER root
