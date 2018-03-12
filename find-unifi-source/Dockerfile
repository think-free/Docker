# Docker for the https://github.com/jacobalberty/find-lf-unifi-source
# Unifi source of https://www.internalpositioning.com find server

FROM debian:stretch

MAINTAINER Christophe <meumeu1402@gmail.com>

# Run file
ADD run /usr/local/bin/

# Install application
RUN apt update && apt install nodejs npm zip -y \
    && wget https://github.com/jacobalberty/find-lf-unifi-source/archive/master.zip \
    && unzip master.zip && rm master.zip && cd find-lf-unifi-source-master && npm install \
    && apt purge zip npm -y && rm -rf /var/lib/apt/lists/ \
    && chmod +x /usr/local/bin/run

CMD /usr/local/bin/run
