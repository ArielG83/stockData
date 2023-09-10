# Description

StocksData is an API which give access to live rates for a veraiety of stocks

The service import data from a JSON file, an AWS Cload JSON, and a Postgres DB.

All stocks are saved into a Redis State manager which them exports the data on for each request.

The service is using docker and docker-compose, which allows for multiple instances of the service to run simultaneously and thus allow scalability and encapsulation.

## Installation

run via docker compose

first run inside the root directory

```bash
docker build .
```

second run

```bash
docker compose up
```

to stop run

```bash
docker compose down
```

## Usage

# returns 'all stocks'

http://localhost:3000/api/stocks

# returns 'selected stocks'

http://localhost:3000/api/stocks?names=ADAP,ADP,ADRO

# Redis

http://localhost:8081

# Postgres

http://localhost:8085
