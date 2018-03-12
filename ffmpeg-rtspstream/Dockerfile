# FFMPEG STREAM TRANSCODER FOR PICAM
# Run this container on other computer

FROM debian:stretch

MAINTAINER Christophe <meumeu1402@gmail.com>

# Run file
ADD run /usr/local/bin/

# Install ffmpeg
RUN apt update && apt install ffmpeg -y  && rm -rf /var/lib/apt/lists/ && chmod +x /usr/local/bin/run

EXPOSE 8181
