TEST_IMAGE_NAME="movies-telegram-bot-test"
IMAGE_NAME="angelvlc/movies-telegram-bot-release"

build:
	docker build -t ${IMAGE_NAME} --target release --build-arg BOT_ID --build-arg API_BASE_URL --build-arg API_USER_NAME --build-arg API_USER_PASSWORD .

build-dev:
	docker build -t ${TEST_IMAGE_NAME} --target test .

console:
	docker run --rm -it ${TEST_IMAGE_NAME} sh

test:
	docker run --rm ${TEST_IMAGE_NAME} npm test

run:
	docker run ${IMAGE_NAME} npm start

console-release:
	docker run --rm -it ${IMAGE_NAME} sh