FROM python:2
MAINTAINER Christophe <meumeu1402@gmail.com>

# Installing dependencies for linux installation of opencv
RUN apt-get update && \
        apt-get install -y \
        build-essential \
        libudev-dev
RUN pip install --no-cache-dir zwave-mqtt-bridge

COPY init /usr/local/bin/

ENTRYPOINT ["init"]
