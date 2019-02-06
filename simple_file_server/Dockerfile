FROM golang:alpine AS go-env
ADD . /go/src/simplehttp
RUN go build simplehttp

FROM alpine
WORKDIR /app
COPY --from=go-env /go/simplehttp /app/
EXPOSE 80
ENTRYPOINT ./simplehttp
