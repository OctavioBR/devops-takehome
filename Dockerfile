FROM gradle:8.11.0-jdk23-jammy AS build
WORKDIR /home/gradle
COPY --chown=gradle:gradle src src
COPY --chown=gradle:gradle build.gradle.kts .
USER gradle
RUN gradle build --no-daemon

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /home/gradle/build/libs/gradle-1.0-SNAPSHOT-all.jar project-1.0-SNAPSHOT-all.jar
VOLUME [ "/app/config.yml" ]
CMD ["java", "-jar", "project-1.0-SNAPSHOT-all.jar", "server", "config.yml"]
