#!/bin/bash
export DISPLAY=:0
xset s off
xset -dpms
xset s noblank
unclutter -idle 0.1 -root &
chromium-browser --noerrdialogs --disable-infobars --kiosk file:///media/lilo/Stick/lilomat/index.html