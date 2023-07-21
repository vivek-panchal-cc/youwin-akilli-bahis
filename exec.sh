#!/bin/bash

if [ $# -eq 0 ]
  then echo "No SYSTEM supplied"
  exit 1
fi

source .env

if [ $1 = "docker" ]
  then docker-compose --project-name ${INSTALLATION} ${@:2}
elif [ $1 = "deploy" ]
  then
    ./exec.sh docker start
    ./exec.sh node "yarn build:prod && exit"
    ./exec.sh docker stop
    # cp -f -r -v ./app/build/static /mnt/c/Dev/youwin/webapp-cms/tr/campaigns/vefa-coupon
elif [ $1 = "deploy:dev" ]
  then
    ./exec.sh node "yarn build:dev && http-server -d build"
    # cp -f -r -v ./app/build/static /mnt/c/Dev/youwin/webapp-cms/test/apps/vefa-coupon
elif [ $# -eq 1 ]
  then docker exec -it ${INSTALLATION}_${1} bash
else
  docker exec -it ${INSTALLATION}_${1} sh -c "${@:2}"
fi