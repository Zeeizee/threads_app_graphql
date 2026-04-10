FROM node

COPY package.json package.json
COPY tsconfig.json tsconfig.json 
COPY src src

RUN npm install
ENTRYPOINT [ "node","src/index.ts" ]

