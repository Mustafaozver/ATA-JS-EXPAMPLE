#!/bin/bash

RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST                                                    $_FN"
echo "$_ST NPM Kuruluyor                                      $_FN"
echo "$_ST                                                    $_FN"
sudo npm install


echo "$_ST                                                    $_FN"
echo "$_ST Sistem Kurulumu Yapılıyor                          $_FN"
echo "$_ST                                                    $_FN"
sudo node ./App/Install.JS
sudo sh ./certificate.sh

echo "$_ST Kişisel Komutlarınız Bekleniyor                    $_FN"
bash