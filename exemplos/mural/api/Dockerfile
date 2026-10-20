# syntax=docker/dockerfile:1
ARG GO_VERSION=1.27.3
FROM golang:${GO_VERSION}-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
COPY . .
ARG APP_VERSION=1.0.0
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 go build -trimpath -ldflags="-s -w -X main.version=${APP_VERSION}" -o /out/api .

FROM alpine:3.22
RUN apk add --no-cache ca-certificates
COPY --from=build /out/api /api
USER 65532:65532
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=4s --start-period=5s --retries=10 CMD ["/api", "-healthcheck"]
ENTRYPOINT ["/api"]
