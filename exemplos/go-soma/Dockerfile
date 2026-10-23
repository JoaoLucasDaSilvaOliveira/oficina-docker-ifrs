FROM golang:1.27.3-alpine AS build
WORKDIR /src
COPY main.go .
RUN CGO_ENABLED=0 go build -o /out/soma main.go

FROM scratch
COPY --from=build /out/soma /soma
USER 65532:65532
ENTRYPOINT ["/soma"]
