FROM postgres:15

RUN echo "Building the Docker image..."

RUN apt-get update && apt-get install -y wait-for-it

COPY ./setup /setup/
COPY ./setup.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/setup.sh
