import RPi.GPIO as GPIO
import time

# GPIO-Setup
GPIO.setmode(GPIO.BCM)
GPIO_PIN = 2
GPIO.setup(GPIO_PIN, GPIO.OUT)

# PWM-Setup
frequency = 3000  # Startfrequenz 3000 Hz
pwm = GPIO.PWM(GPIO_PIN, frequency)
pwm.start(50)  # Startet PWM mit 50% Duty Cycle

# Frequenzen der Noten in Hertz, angepasst auf den Bereich des Piezosummers
C4 = 262
D4 = 294
E4 = 330
F4 = 349
G4 = 392
A4 = 440
B4 = 494
C5 = 523

# Melodie definieren (Note, Dauer)
twinkle_twinkle = [
    (C4, 0.5), (C4, 0.5), (G4, 0.5), (G4, 0.5),
    (A4, 0.5), (A4, 0.5), (G4, 1),
    (F4, 0.5), (F4, 0.5), (E4, 0.5), (E4, 0.5),
    (D4, 0.5), (D4, 0.5), (C4, 1),
]

try:
    for note, duration in twinkle_twinkle:
        if note == 0:
            time.sleep(duration)
        else:
            pwm.ChangeFrequency(note)
            time.sleep(duration)
except KeyboardInterrupt:
    pass
finally:
    pwm.stop()  # Stoppt PWM
    GPIO.cleanup()  # Setzt die GPIO-Pins zurück
