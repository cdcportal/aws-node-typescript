#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

# create our working directory if it doesn't exist
DIR="/home/ec2-user/aws-node-ts-backend"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
  rm -rf ${DIR}
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi