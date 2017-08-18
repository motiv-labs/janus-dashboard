NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

.PHONY: all clean deps build

deps-docker:
	@echo "$(OK_COLOR)==> Installing dependencies using dockerized node$(NO_COLOR)"
	@docker run -it --rm -v "`pwd`:/app" -w "/app" node:8-alpine npm install

build-docker:
	@echo "$(OK_COLOR)==> Building using dockerized node... $(NO_COLOR)"
	@docker run -it --rm -v "`pwd`:/app" -w "/app" node:8-alpine npm run build

run-docker:
	@echo "$(OK_COLOR)==> Running app on port 8082 (see assigned docker port)... $(NO_COLOR)"
	@docker run -it --rm -v "`pwd`:/app" -w "/app" -p 8082 node:8-alpine npm run start

serve-docker:
	@echo "$(OK_COLOR)==> Serving app on port 5000 (see assigned docker port)... $(NO_COLOR)"
	@docker run -it --rm -v "`pwd`:/app" -w "/app" -p 5000 node:8-alpine sh -c "yarn global add serve && serve -s build"

clean:
	@echo "$(OK_COLOR)==> Cleaning project$(NO_COLOR)"
	@rm -rf ./build ./node_modules

deps:
	@echo "$(OK_COLOR)==> Installing dependencies$(NO_COLOR)"
	@sh -c "npm set progress=false; npm install"

build:
	@echo "$(OK_COLOR)==> Building... $(NO_COLOR)"
	@npm run build

all: clean deps build

all-docker: clean deps-docker build-docker
