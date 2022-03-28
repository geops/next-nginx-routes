# Example

Minimal Docker example.

## Getting started

### Installation

Install all dependencies:

```shell
yarn install
```

### Export

Run Next.js static HTML export:

```shell
yarn run export
```

### Build

Build Docker image:

```shell
docker build -t next-nginx-routes-example .
```

### Run

Start Docker container and open [localhost:8080](http://localhost:8080) in your browser:

```shell
docker run -p 8080:80 next-nginx-routes-example
```
