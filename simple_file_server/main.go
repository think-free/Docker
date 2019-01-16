package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	port := flag.String("p", "80", "Port to serve on")
	directory := flag.String("d", "/static", "The directory of static file to host")
	flag.Parse()

	http.Handle("/", http.FileServer(http.Dir(*directory)))

	log.Printf("Serving %s on HTTP port: %s\n", *directory, *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}
