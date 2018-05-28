FROM mongo

COPY fixtures/seed.json /seed.json
CMD mongoimport --host janus-database --db janus --collection api_specs --type json --file /seed.json

