FROM fonoster/base
COPY . /scripts
RUN ./install.sh
RUN mkdir /home/fonos/access & chown fonos /home/fonos/access
USER fonos
