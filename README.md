# TOTVS MODA API CONNECTOR
This is the code to connect and keep synced a SQL(relational database) with TOTVS MODA data. 
The data stored from each entity is focused in feeding a E-commerce website.
API Documentation: https://tdn.totvs.com.br/pages/releaseview.action?pageId=532385018

## TODO
### Use Cases
[X] - UPSERT colors.
[/] - UPSERT sizes. (Need to fully implement, and remove responsability of UPSERT products info USE CASE)
[X] - UPSERT products info.
[] - UPSERT products balance.
[] - UPSERT products OPs.
[] - UPSERT products prices.
[] - UPSERT clients.
[] - UPSERT orders.
[] - UPSERT orders with products.
[X] - LIST products with query params.
[] - LIST clients with query params.
[] - LIST orders with query params.
[] - LIST orders with products with query params.
[] - CREATE User.
[] - CREATE Order.


### Functionalities
[X] - Add colors backup.
[X] - Add product info backup.
[] - Add product balances backup.
[] - Add product OPs backup.
[] - Add product prices and cost backup.
[] - Add clients backup.
[] - Add orders backup.
[] - Add orders with products backup.
[] - Add update for product details in database every 1 minute updates from TOTVS.
[] - Add update for product balance in database every 1 minute updates from TOTVS.
[] - Add update for product prices and cost in database every 1 minute updates from TOTVS.
[] - Add update for clients in database every 1 minute updates from TOTVS.
[] - Add update for orders in database every 1 minute updates from TOTVS.
[] - Add update for orders with products in database every 1 minute updates from TOTVS.
[] - Make scheduler to run updated every 1 minute in all update endpoints, in the right order:
    1st - Colors
    2nd - Sizes
    3rd - Product Info
    4th - Product Balances/Prices/OPs
    5th - Clients
    6th - Orders
    7th - Orders with Products
[] - Create client and push it into TOTVS MODA API.
[] - Create order and push it into TOTVS MODA API.
[] - Add JWT and role based authentication to access private routes.
