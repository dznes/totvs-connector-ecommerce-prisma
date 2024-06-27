# TOTVS MODA API Connector

This project connects and keeps a SQL (relational database) synced with TOTVS MODA data. The data stored from each entity is focused on feeding an E-commerce website.

## API Documentation

[TOTVS API Documentation](https://tdn.totvs.com.br/pages/releaseview.action?pageId=532385018)

## TODO

### Use Cases

- [X] UPSERT colors.
- [/] UPSERT sizes. (Need to fully implement, and remove responsibility of UPSERT products info USE CASE)
- [X] UPSERT products info.
- [ ] UPSERT products balance.
- [ ] UPSERT products OPs.
- [ ] UPSERT products prices.
- [ ] UPSERT products costs.
- [ ] UPSERT clients.
- [ ] UPSERT orders.
- [ ] UPSERT orders with products.
- [X] LIST products with query params.
- [ ] LIST clients with query params.
- [ ] LIST orders with query params.
- [ ] LIST orders with products with query params.
- [ ] CREATE User.
- [ ] CREATE Order.

### Functionalities

- [X] Add colors backup.
- [X] Add product info backup.
- [ ] Add product balances backup.
- [ ] Add product OPs backup.
- [ ] Add product prices backup.
- [ ] Add product cost backup.
- [ ] Add clients backup.
- [ ] Add orders backup.
- [ ] Add orders with products backup.
- [ ] Add update for product details in database every 1 minute updates from TOTVS.
- [ ] Add update for product balance in database every 1 minute updates from TOTVS.
- [ ] Add update for product prices and cost in database every 1 minute updates from TOTVS.
- [ ] Add update for clients in database every 1 minute updates from TOTVS.
- [ ] Add update for orders in database every 1 minute updates from TOTVS.
- [ ] Add update for orders with products in database every 1 minute updates from TOTVS.
- [ ] Make scheduler to run updates every 1 minute in all update endpoints, in the right order:
  1. Colors
  2. Sizes
  3. Product Info
  4. Product Balances/Prices/OPs
  5. Clients
  6. Orders
  7. Orders with Products
- [ ] Create client and push it into TOTVS MODA API.
- [ ] Create order and push it into TOTVS MODA API.
- [ ] Add JWT and role-based authentication to access private routes.
