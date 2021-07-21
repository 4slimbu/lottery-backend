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

# copy prod config (for docker)
cp env.example production.env
```

## Installation using docker
For now docker installation creates production build only.
```
# run app 
docker-compose up -d

# stop and remove containers
docker-compose down 

# if necessary, rebuild app 
docker-compose build app
```
## Installation without docker
```
# install dependencies
npm install

# run in dev mode
npm start

# create production build
npm run-script build
```

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