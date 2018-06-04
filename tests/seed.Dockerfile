FROM mongo

COPY fixtures/* /
CMD mongoimport --host janus-database --db janus --collection api_specs --type json --file /seed_api.json && 
