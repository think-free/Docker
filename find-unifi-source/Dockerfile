# Docker for the https://github.com/jacobalberty/find-lf-unifi-source
# Unifi source of https://www.internalpositioning.com find server

FROM node:8-stretch
MAINTAINER Christophe <meumeu1402@gmail.com>

# Run file
ADD run /usr/local/bin/

# Copy node files
COPY node/* /srv/

# Install application
RUN cd /srv && npm install \
    && rm -rf /var/lib/apt/lists/ \
    && chmod +x /usr/local/bin/run

CMD /usr/local/bin/run
