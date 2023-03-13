#!/bin/bash

#give permission for everything in the app directory
sudo chmod -R 777 /home/ec2-user/aws-node-ts-backend

#navigate into our working directory where we have all our github files
cd /home/ec2-user/aws-node-ts-backend

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm ci && NODE_ENV=production npm run build

cd dist
#start our node app in the background
node api.bundle.js > app.out.log 2> app.err.log < /dev/null & 
