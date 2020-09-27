#Chon he dieu hanh  
FROM node:12.16-alpine  

WORKDIR /app/
ADD package.json .
RUN yarn install --production=true
ADD src ./src
RUN ls -alh
CMD [ "yarn", "start" ]
EXPOSE 3000
