#!/bin/bash

RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[33m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST                                                    $_FN"
echo "$_ST Test Ediliyor                                      $_FN"
echo "$_ST                                                    $_FN"

npm run test