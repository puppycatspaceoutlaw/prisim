# prisim

## Setup

1. [Install Hugo](https://gohugo.io/installation/)

2. Run hugo web server

```shell
hugo server --buildDrafts
```

## Running the image optimizer

```shell
docker build -t image-optimizer .

docker run --rm -v "$(pwd):/images" image-optimizer
```