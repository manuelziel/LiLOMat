=== LiLOMat ===
Autor: Manuel Ziel
Author URI: https://liste-lebenswerte-ortenau.de
Contributors: LiLO
Requires RPI, RPI Display, Piezo, Thermalprinter
License: MIT
License URI: https://opensource.org/license/mit

Customized styles and functions by Manuel Ziel.

== Description ==
This project is a quiz game that utilizes WebSocket communication
for real-time interactions. The game offers multiple quiz options
including "LiLO", "LHL", and "Lokaler Meister" (Master). Players can start, skip,
and quit quizzes through an intuitive interface. The game tracks
correct and incorrect answers and displays a summary at the end
of each quiz. WebSockets are used to handle tone notifications and
print quiz summaries.

== Installation ==
1. Show Drives: sudo lsblk
2. Compress image sudo dd if=/dev/sdX bs=4M | gzip > ./backup.img.gz (Current dir)
3. Write Image: sudo dd if=/dir/dir/backup.img.gz bs=4M | gzip -dc | sudo dd of=/dev/sdY bs=4M
4. Copy with ssh: sudo scp -r /home/user/dir/* lilo@lilo:/media/lilo/Stick/lilomat/

    == Node Red ==
        1. bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
        2. sudo systemctl enable nodered.service
        3. node-red-start
        4. Use "chmod a+rw /dev/ttyS0" for UART permission
        5. Set 'raspi-config' and turn UART on without terminal function
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

    == GPIO ==
        1. GPIO02 (SDA) Piezo PWM
        2. GPIO14 (TXD0) Thermalprinter Blue Cable
        3. GPIO15 (RXD0) Thermalprinter Green Cable

== Changelog ==
Semantic Versioning -> https://semver.org/

= 0.0.1 alpha02 - 2024-07-07 =
- Add max question option
- Add Auto reconnect for WebSocked
- Add Print-Function for every quiz
- Add Countdown Timer with 25s
- Add Comments
- FIX win tone
- Change Manu Quiz to Master Quiz 

= 0.0.1 alpha01 - 2024-07-03 =
- Add Questions

= 0.0.1 alpha - 2024-07-02 =
- Start
