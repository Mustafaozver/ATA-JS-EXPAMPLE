# ATA-JS-EXPAMPLE






sudo apt-get install postgresql postgresql-contrib -y

sudo service postgresql restart
ps -ef | grep postgres
sudo -u postgres psql -c "SELECT version();"
sudo -i -u postgres
psql
ALTER ROLE postgres WITH LOGIN;
\password postgres

sudo systemctl start postgresql.service
sudo -i -u postgres


curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg


sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

sudo apt install pgadmin4 -y
sudo apt install pgadmin4-desktop -y
sudo apt install pgadmin4-web -y

sudo /usr/pgadmin4/bin/setup-web.sh



sudo apt-get install redis
sudo service redis-server start
redis-cli --version