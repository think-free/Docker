# Compiling server
FROM golang:alpine AS go-env
WORKDIR /srv
RUN apk add git alpine-sdk
RUN go get -u github.com/mholt/timeliner/cmd/timeliner
RUN mv ${GOPATH}/bin/timeliner /srv/

# Last stage : Creating final container
FROM alpine
WORKDIR /app
RUN apk add ca-certificates
COPY --from=go-env /srv/timeliner /usr/local/bin/
ADD run /usr/local/bin/run

EXPOSE 8080
ENTRYPOINT /usr/local/bin/run


