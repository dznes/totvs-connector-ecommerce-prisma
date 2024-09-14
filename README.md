# TOTVS MODA API Connector

This project connects and keeps a SQL Relational Database synced with TOTVS MODA database (document based). The data stored from each entity is focused on feeding an E-commerce website.

## API Documentation

[TOTVS API Documentation](https://tdn.totvs.com.br/pages/releaseview.action?pageId=532385018)

## Order Codes:
 1911           | [S] REMESSA EM BONIFICACAO MARKETING
 510            | [S] VENDA E-COMMERCE (B2C)
 701            | [S] VENDA EXPORTACAO (B2B)
 500            | [S] VENDA ATACADO (B2B) (SHOW ROOW)
 702            | [S] VENDA EXPORTACAO (B2C)
 752            | 5501- REMESSA COM FIM ESPECIFICO PARA EXPORTACAO
 704            | [S] VENDA EXPORTACAO (ATACADO)

## TODO

### Use Cases
  #### Database Backup 
  - [X] UPSERT colors.
  - [X] UPSERT sizes. (Need to fully implement, and remove responsibility of UPSERT skus info USE CASE)
  - [X] UPSERT skus info.
  - [X] UPSERT skus balance.
  - [ ] UPSERT skus OPs.
  - [X] UPSERT skus prices.
  - [X] UPSERT skus costs.
  - [X] UPSERT clients.
  - [X] UPSERT orders.
  - [X] UPSERT orders with skus.
  - [X] LIST skus with query params.
  - [ ] LIST clients with query params.
  - [X] LIST orders with query params.
  - [ ] LIST orders with skus with query params.
  - [ ] CREATE and PUSH User in TOTVS.
  - [ ] CREATE and PUSH Order in TOTVS.
  - [ ] BACKUP PRODUCT IMAGES THAT ARE BASE64 FROM TOTVS.

  #### FrontEnd End-Points 
    ##### PRODUCTS
    - [X] GET product by slug with sku, variations and images.
    - [X] GET product by product ID with sku, variations and images.
    - [X] SEARCH for products with query params and pagination.
    - [X] LIST all products with pagination.
    ##### SKUS
    - [X] GET sku by slug.
    - [X] GET sku by sku ID.
    - [X] LIST skus by product ID with variation and image information.
    - [X] SEARCH for skus with query params and pagination.
    - [X] LIST all skus with pagination.
    ##### CUSTOMERS
    - [X] GET customer information by client ID.
    - [X] LIST customer orders by client ID.
    - [X] LIST customer orders.
    - [ ] CREATE customer account.
    - [ ] UPDATE customer account information.
    ##### ORDERS
    - [X] GET order information by order ID.
    - [X] LIST orders using query params and pagination.
    - [ ] CREATE order.
    - [ ] UPDATE order specific informations.
    - [ ] UPDATE order status with webhooks.


### Database Integration Functionalities
- [X] Add colors backup.
- [X] Add product info backup.
- [X] Add product balances backup.
- [ ] Add product OPs backup.
- [X] Add product prices backup.
- [X] Add product cost backup.
- [X] Add clients backup.
- [X] Add orders backup.
- [X] Add orders with skus backup.
- [ ] Create client and push it into TOTVS MODA API.
- [ ] Create order and push it into TOTVS MODA API.
- [X] Add JWT and role-based authentication to access private routes.

### Scheduller using Google Console
- [X] Add update for product details in database every 15 minutes updates from TOTVS.
- [X] Add update for product balance in database every 15 minutes updates from TOTVS.
- [X] Add update for product prices and cost in database every 15 minutes updates from TOTVS.
- [X] Add update for clients in database every 15 minutes updates from TOTVS.
- [X] Add update for orders in database every 15 minutes updates from TOTVS.
- [X] Add update for orders with skus in database every 15 minutes updates from TOTVS.
- [X] Make scheduler to run updates every 15 minutes in all update endpoints, in the right order:
  Sku and Products:
  1. Colors
  2. Sizes
  3. Product Info
  4. Product Balances/Prices/Costs
  Users and Orders:
  1. Clients
  2. Orders
  3. Orders with Products

#### CORRECTIONS AFTER IMPLEMENTATION:
PERFORM CROSS-ANALYSIS OF THE INTERNAL DATABASE AND TOTVS.
ITERATE OVER ALL ORDER INVOICES AND ADD EVERY ONE OF THEM.
ADD TRANSACTIONS AND ALL ITS INFORMATIONS INTO SEPARATE DATABASE.
NEED TO REFACTOR PRODUCT AND PRODUCT IMAGES BACKUP, USING DDD.
ADD INTERFACES TO VTEX LIB RESPONSES.

