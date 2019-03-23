FROM java:8u111-jdk

RUN mkdir -p /opt/speed-control-api/
WORKDIR /opt/speed-control-api
COPY target/SpeedControlApp.jar /opt/speed-control-api/speed-control-api.jar

EXPOSE 8082

CMD ["java", "-jar", "speed-control-api.jar", "--spring.profiles.active=prod"]

