FROM mongo

COPY fixtures/* /
CMD mongoimport --host janus-database --db janus --collection api_specs --type json --file /seed_api.db.json && \
    mongoimport --host janus-database --db janus --collection oauth_servers --type json --file /seed_oauth_server.db.json
