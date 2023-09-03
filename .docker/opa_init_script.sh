#!/bin/bash

npm install

# TODO: Pesquisar forma bonita para apenas rodar a migração depois que a pasta DB tiver pronta.
sleep 5

npm run typeorm migration:run

npm run start:dev
