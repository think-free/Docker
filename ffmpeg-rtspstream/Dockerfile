# FFMPEG STREAM TRANSCODER FOR PICAM
# Run this container on other computer

FROM debian:stretch

MAINTAINER Christophe <meumeu1402@gmail.com>

# Run file
WORKDIR /app
ADD run /app/

# Install ffmpeg
RUN apt update && apt install ffmpeg -y  && rm -rf /var/lib/apt/lists/ && chmod +x /app/run

EXPOSE 8181
ENTRYPOINT ./run
