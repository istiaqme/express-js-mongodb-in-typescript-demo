FROM node:14.15.1-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# add credentials on build
ARG JWT_KEY



ARG JWT_KEY
ARG NODE_ENV
ARG DOMAIN
ARG DB_URI
ARG SMTP_HOST
ARG SMTP_USER
ARG SMTP_PASSWORD

ENV JWT_KEY=$JWT_KEY
ENV NODE_ENV=$NODE_ENV
ENV DOMAIN=$DOMAIN
ENV DB_URI=$DB_URI
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASSWORD=$SMTP_PASSWORD


RUN mkdir /root/.ssh/
COPY eksgit /root/.ssh/id_rsa
RUN chmod 0400 /root/.ssh/id_rsa

# make sure your domain is accepted
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000
