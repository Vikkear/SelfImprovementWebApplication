#! /usr/bin/env bash

if [ -z "$2" ]
  then
    echo "Inte tillräckligt med argument"
    exit 1
fi

USERNAME=$1
USERPASS=$2
DATABASE="selfimprovement"

mysql "-u$USERNAME" "-p$USERPASS" < ./setup.sql
mysql "-u$USERNAME" "-p$USERPASS" $DATABASE < ./ddl.sql
mysql "-u$USERNAME" "-p$USERPASS" $DATABASE < ./insert.sql

echo "Klar!"
exit 0