#! /usr/bin/env bash

read -p "Vill du starta om databasen? (y/n): " confirm

if [ "$confirm" != "n" ] && [ "$confirm" != "no" ]
  then
    read -p "Användarnamn: " username
    read -sp "Lösenord: " password
    echo -e "\n"
    cd src/server/sql/
    ./reset.bash "$username" "$password"
    cd ../../../..
fi
