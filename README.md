# Lottery-Backend
Backend for [lotterycamp](https://github.com/limvus/lotterycamp.git) project.

## Requirements
- docker [or]
- node >= 12.7.0
- npm >= 6.10.0

Note: can use nvm to manage node version

## Setup Config
Uses [react-app-env](https://www.npmjs.com/package/react-app-env) to manage config.
```
# copy dev config
cp env.example development.env

# copy prod config
cp env.example production.env

# update env variables as per local or prod then run:
npm install 
npm start (for local development)
app will be available at: localhost:3000

# for production
# add vhost in /etc/hosts
127.0.0.1 backend.lotterycamp.com # prod
127.0.0.1 backend.lotterycamp.local # local dev

# in docker-compose.yml update environment variables in nginx server container
environments:
  - VIRTUAL_HOST=backend.lotterycamp.com
  - LETSENCRYPT_HOST=backend.lotterycamp.com

# run app 
npm run build
docker-compose up -d
app will be available at: https://backend.lotterycamp.com

# stop and remove containers
docker-compose down 

# if necessary, rebuild app 
docker-compose build app
```
## Key Info
- for rebranding, replace all variation of lotterycamp
- replace logo|favicon (src/assets/images|public/index.js)
- replace logo link in scss/**

## Contribution
If you want to contribute, just fork the repository and play around, create 
issues and submit the pull request. Help is always welcomed.

## Security
If you discover any security related issues, please email hello@sudiplimbu.com 
instead of using the issue tracker.

## License
The scripts and documentation in this project are released under the MIT License

## Author
Sudip Limbu