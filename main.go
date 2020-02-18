package main

import (
	"crypto/tls"
	"flag"
	"net/http"
	"strings"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/acme/autocert"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/johanbrandhorst/cat-collection/service"
	"github.com/johanbrandhorst/cat-collection/service/proto/api/v1"
	"github.com/johanbrandhorst/cat-collection/ui"
)

var logger *logrus.Logger
var host = flag.String("host", "", "host to get LetsEncrypt certificate for")

func init() {
	logger = logrus.StandardLogger()
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:     true,
		FullTimestamp:   true,
		TimestampFormat: time.RFC3339Nano,
		DisableSorting:  true,
	})
	// Should only be done from init functions
	grpclog.SetLogger(logger)
}

func main() {
	flag.Parse()

	gs := grpc.NewServer()
	api.RegisterCatServiceServer(gs, &service.Server{})
	wrappedServer := grpcweb.WrapServer(gs, grpcweb.WithWebsockets(true))

	httpsSrv := &http.Server{
		ReadTimeout: 5 * time.Second,
		WriteTimeout: 10 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       120 * time.Second,
		Addr:              ":https",
		TLSConfig: &tls.Config{
			PreferServerCipherSuites: true,
			CurvePreferences: []tls.CurveID{
				tls.CurveP256,
				tls.X25519,
			},
		},
		Handler: hstsHandler(
			grpcTrafficSplitter(
					http.FileServer(&assetfs.AssetFS{
						Asset:     ui.Asset,
						AssetDir:  ui.AssetDir,
						AssetInfo: ui.AssetInfo,
					}),
				wrappedServer,
			),
		),
	}

	// Serve on localhost with localhost certs if no host provided
	if *host == "" {
		httpsSrv.Addr = "localhost:3000"
		logger.Info("Serving on https://localhost:3000")
		logger.Fatal(httpsSrv.ListenAndServeTLS("./insecure/cert.pem", "./insecure/key.pem"))
	}

	// Create auto-certificate https server
	m := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist(*host),
		Cache:      autocert.DirCache("/certs"),
	}

	// Create server for redirecting HTTP to HTTPS
	httpSrv := &http.Server{
		Addr:         ":http",
		ReadTimeout:  httpsSrv.ReadTimeout,
		WriteTimeout: httpsSrv.WriteTimeout,
		IdleTimeout:  httpsSrv.IdleTimeout,
		Handler:      m.HTTPHandler(nil),
	}
	go func() {
		logger.Fatal(httpSrv.ListenAndServe())
	}()

	httpsSrv.TLSConfig.GetCertificate = m.GetCertificate
	logger.Info("Serving on https://0.0.0.0:443, authenticating for https://", *host)
	logger.Fatal(httpsSrv.ListenAndServeTLS("", ""))
}

// hstsHandler wraps an http.HandlerFunc such that it sets the HSTS header.
func hstsHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
		h.ServeHTTP(w, r)
	})
}

func grpcTrafficSplitter(fallback http.Handler, grpcHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Redirect gRPC and gRPC-Web requests to the gRPC Server
		if strings.Contains(r.Header.Get("Content-Type"), "application/grpc") {
			grpcHandler.ServeHTTP(w, r)
		} else {
			fallback.ServeHTTP(w, r)
		}
	})
}
