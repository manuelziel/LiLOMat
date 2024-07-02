=== LiLOMat ===
Author URI: https://liste-lebenswerte-ortenau.de
Contributors: LiLO
Requires RPI
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Customized styles and functions by Manuel Ziel.

== Description ==

Current base functions:


Roadmap:
- Check Boot splash

Usage:


== Installation ==
1. Show Drives: sudo lsblk
2. Compress image sudo dd if=/dev/sdX bs=4M | gzip > ./backup.img.gz (Aktuelles Verzeichniss)
3. Write Image :sudo dd if=/pfad/zum/backup.img.gz bs=4M | gzip -dc | sudo dd of=/dev/sdY bs=4M

    == Node Red ==
    1. bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
    2. sudo systemctl enable nodered.service
    3. node-red-start
    4. Use "chmod a+rw /dev/ttyS0" for UART permission
    5. Set raspi-config UART on without terminal
    6. Import Project
    7. Reboot

    == Kiosk Mode ==
    1. sudo apt install unclutter
    2. sudo nano /etc/systemd/system/kiosk.service // add kiosk.service
    3. sudo systemctl daemon-reload
    4. sudo systemctl enable kiosk.service
    5. sudo systemctl start kiosk.service
    6. sudo systemctl status kiosk.service
    7. Reboot

== Changelog ==
Semantic Versioning -> https://semver.org/



= 0.0.1 alpha - 2024-06-24 =
- start
