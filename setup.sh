sudo apt-get update
sudo apt-get install -y curl
sudo apt-get install recoll

curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

cd doc-ms

npm install

sudo npm install -g pm2

pm2 start app.js

echo "You may access Web UI on localhost:8080"
