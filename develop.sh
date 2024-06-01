#!/bin/bash

RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"


MYDIR="$(dirname "$(realpath "$0")")/"
DES="~/oms_v2"
DATE=$(date +'%d_%m_%Y')
TIME=$(date +'%H:%M')
CURRENT_TIMESTAMP=$(date +%s)

GIT_MSG="$(cat ./GIT_MSG.txt)"

COMMITMSG="$CURRENT_TIMESTAMP - SHPUSH ($GIT_MSG) - $TIME - $DATE"

echo "$_ST                                                    $_FN"
echo "$_ST Development Stack                                  $_FN"
echo "$_ST                               Mustafa ÖZVER        $_FN"
echo "$_ST                                                    $_FN"

echo "$_ST Githuh Pull kontrol ediliyor                       $_FN"
##git config pull.rebase true
##git pull origin main
git pull


echo "$_ST Github push yedekleniyor                           $_FN"
git add .
git commit -m "$COMMITMSG"
##git push origin main
git push

echo "$_ST Github Pull çekiliyor                              $_FN"
##git config pull.rebase false
##git pull origin main

##echo "$_ST Kurulum yapılıyor $_FN"
##sh install.sh

echo " === >>> GITHUB Yedeği alındı, $COMMITMSG"

echo "$_ST Dahili dosyalar kontrol ediliyor                   $_FN"
git status

##echo "$_ST Kişisel komut bekleniyor $_FN"
##bash

echo "$_ST Başlatılıyor                                       $_FN"
sh ./run_test.sh

##echo "$_ST Kişisel Komutlarınız : $_FN"
##bash