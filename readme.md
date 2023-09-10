# Description

StocksData is an API which give access to live rates for veriose stocks

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
