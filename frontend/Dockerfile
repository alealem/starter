FROM node:10.13-jessie as build

WORKDIR /opt/speedcontrol
COPY package.json yarn.lock /opt/speedcontrol/
RUN yarn --frozen-lockfile --non-interactive

COPY . /opt/speedcontrol/
RUN yarn flow-check && yarn build:dist && yarn bundle-server

FROM debian:jessie

WORKDIR /opt/speedcontrol
COPY --from=build /opt/speedcontrol/dist/ /opt/speedcontrol/dist/
COPY --from=build /opt/speedcontrol/speedcontrol-front /opt/speedcontrol/

EXPOSE 3000

CMD ["./speedcontrol-front", "--", "--server.port=3000"]
