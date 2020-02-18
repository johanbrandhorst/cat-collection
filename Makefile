dev: ui
	go run main.go

.PHONY: ui
ui:
	cd ui && npm run build
	go-bindata -pkg ui -prefix ui/build -nometadata -o ui/bindata.go ui/build/...

.PHONY: proto
proto:
	protoc -I proto \
		--go_out=plugins=grpc,paths=source_relative:./service/proto \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:./ui/src/proto \
		--js_out=import_style=commonjs,binary:./ui/src/proto \
		./proto/api/v1/api.proto

	# https://github.com/grpc/grpc-web/issues/447#issuecomment-586668982
	for f in $$(find ./ui/src/proto -type f -name "*.js"); do \
		printf '/* eslint-disable */\n//@ts-nocheck\n' | cat - "$${f}" > temp && mv temp "$${f}"; \
	done

install:
	wget -O $$(go env GOPATH)/bin/protoc-gen-grpc-web \
		https://github.com/grpc/grpc-web/releases/download/1.0.7/protoc-gen-grpc-web-1.0.7-linux-x86_64
	chmod +x $$(go env GOPATH)/bin/protoc-gen-grpc-web
	go install github.com/tmthrgd/go-bindata/go-bindata

generate_cert:
	cd insecure && go run "$$(go env GOROOT)/src/crypto/tls/generate_cert.go" \
		--host=localhost,127.0.0.1 \
		--ecdsa-curve=P256 \
		--ca=true
