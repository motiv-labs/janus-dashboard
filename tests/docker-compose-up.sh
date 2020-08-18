#!/usr/bin/env sh

set -e

DOCKER_COMPOSE="./tests/docker-compose.test.yml"

echo "===> Starting containers"
docker-compose -f "${DOCKER_COMPOSE}" up --remove-orphans --build -d

echo "===> Ensuring containers are healthy"
RETRY_COUNT=${ENSURE_RETRY_COUNT:-15}
RETRY_TIMEOUT=${ENSURE_RETRY_TIMEOUT:-5}
for i in $(seq 1 "${RETRY_COUNT}"); do
    RETRY_MSG="(try #${i} / ${RETRY_COUNT})"
    printf "%-60s %s\r" "Checking containers health" "${RETRY_MSG}"

    # shellcheck disable=SC2046
    CONTAINER_STATUS=$(docker inspect $(
        docker-compose -f "${DOCKER_COMPOSE}" ps -q) |\
        jq -r '.[]? | if .State.Health.Status == null then "healthy" else .State.Health.Status end' |\
        sort | uniq
    )
    if [ "${CONTAINER_STATUS}" = "healthy" ]; then
        printf "%-60s %s\n" "All containers health checks report healthy!" "${RETRY_MSG}"
        break
    fi

    if [ "$i" -eq "${RETRY_COUNT}" ]; then
        printf "%-60s %s\n" "Failed to up containers into a healthy state" "${RETRY_MSG}"

        echo "===> Current containers statuses"
        docker-compose -f "${DOCKER_COMPOSE}" ps

        echo "===> Current containers logs"
        docker-compose -f "${DOCKER_COMPOSE}" logs
        exit 1
    fi

    printf "%-60s %s\r" "Waiting ${RETRY_TIMEOUT} seconds for containers to be healthy" "${RETRY_MSG}"
    sleep "${RETRY_TIMEOUT}"
done
