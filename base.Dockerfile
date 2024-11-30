FROM docker-registry.thunics.com:5000/node20_docker20_base:v1.0
RUN mkdir -p /apps/cmd-swift
WORKDIR /apps/cmd-swift
COPY ./package.json /apps/cmd-swift/package.json
COPY ./package-lock.json /apps/cmd-swift/package-lock.json

RUN npm install