# FFMPEG STREAM TRANSCODER FOR PICAM
# Run this container on other computer

FROM debian:stretch

MAINTAINER Christophe <meumeu1402@gmail.com>

# Install ffmpeg
RUN apt update && apt install ffmpeg -y  && rm -rf /var/lib/apt/lists/*

# Run file
ADD run /usr/local/bin/
RUN chmod +x /usr/local/bin/run

EXPOSE 8181
