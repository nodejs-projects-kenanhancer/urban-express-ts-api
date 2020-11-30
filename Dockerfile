FROM node:15.3.0-alpine3.10 AS builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY ["tsconfig.json", "tslint.json", "./"]
COPY ./src ./src
## compile typescript
RUN npm run build
## remove packages of devDependencies
RUN npm prune --production


FROM node:15.3.0-alpine3.10
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder ./usr/src/app/dist ./dist
COPY --from=builder ./usr/src/app/package* ./
COPY --from=builder ./usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
