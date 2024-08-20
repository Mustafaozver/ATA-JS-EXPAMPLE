# ATA-JS-EXPAMPLE

sudo apt install postgresql postgresql-contrib -y

sudo service postgresql restart
ps -ef | grep postgres
sudo -u postgres psql -c "SELECT version();"
sudo -i -u postgres psql -c "ALTER ROLE postgres WITH LOGIN;"

ALTER ROLE postgres WITH LOGIN;

\password postgres

sudo systemctl start postgresql.service
sudo -i -u postgres

sudo -u postgres psql -c "CREATE SCHEMA project;"

curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

sudo apt install pgadmin4 -y
sudo apt install pgadmin4-desktop -y
sudo apt install pgadmin4-web -y

sudo /usr/pgadmin4/bin/setup-web.sh

sudo apt install redis
sudo service redis-server start
redis-cli --version

sudo apt install sqlite3


---




    #NODEJS
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

sudo apt install nodejs npm
sudo apt-get update && sudo apt-get install yarn
npm -v

    #POSTGRESQL
sudo apt-get install postgresql postgresql-contrib -y

#### dosyayı değiştir

sudo service postgresql restart
ps -ef | grep postgres
sudo -u postgres psql -c "SELECT version();"
sudo -i -u postgres
psql
ALTER ROLE postgres WITH LOGIN;
\password postgres

sudo systemctl start postgresql.service
sudo -i -u postgres

    #REDIS
sudo apt-get install redis
sudo service redis-server start
redis-cli --version

    #RABBITMQ
sudo apt-get install rabbitmq-server -y --fix-missing
sudo systemctl start rabbitmq-server
rabbitmq-plugins list
rabbitmq-plugins enable rabbitmq-management
127.0.0.1:15672 -- guest -guest
