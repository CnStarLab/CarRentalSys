# Use the official Golang image as the base image
FROM golang:1.21-bullseye

# Set the Current Working Directory inside the container
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Copy the entire project source code
COPY . .

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=test \
    POSTGRES_PASSWORD=513513 \
    POSTGRES_DB=testing \
    POSTGRES_HOST=db \
    POSTGRES_PORT=5432 \
    POSTGRES_SSLMODE=disable

# Expose the application ports
EXPOSE 3000 8080

# Copy entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN chmod +x tests/test.sh

RUN cd src/backend/cmd && go mod download

RUN cd src/frontend && npm i

# Set entrypoint command
ENTRYPOINT ["/entrypoint.sh"]