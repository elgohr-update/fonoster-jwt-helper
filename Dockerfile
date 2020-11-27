FROM fonoster/base
COPY . /scripts
RUN ./install.sh
RUN chown -R fonos /scripts/node_modules
USER fonos
