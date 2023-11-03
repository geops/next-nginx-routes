# Example

Minimal Docker example.

## Getting started

### Installation

Install all dependencies:

```shell
yarn install
```

### Next.js build

Run Next.js build and generate Nginx routes configuration file:

```shell
yarn run build
```

### Docker build

Build Docker image:

```shell
docker build -t next-nginx-routes-example .
```

### Docker run

Start Docker container and open [localhost:8080](http://localhost:8080) in your browser:

```shell
docker run -p 8080:80 next-nginx-routes-example
```
