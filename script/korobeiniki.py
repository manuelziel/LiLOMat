import RPi.GPIO as GPIO
import time

time.sleep(duration)

# GPIO-Setup
GPIO.setmode(GPIO.BCM)
GPIO_PIN = 2
GPIO.setup(GPIO_PIN, GPIO.OUT)

# PWM-Setup
frequency = 3000  # Start frequency 3000 Hz
pwm = GPIO.PWM(GPIO_PIN, frequency)
pwm.start(50)  # Start PWM with 50% Duty Cycle

# Frequencies of notes in Hertz
C3 = 131
D3 = 147
E3 = 165
F3 = 175
G3 = 196
A3 = 220
B3 = 247
C4 = 262
D4 = 294
E4 = 330
F4 = 349
G4 = 392
A4 = 440
B4 = 494
C5 = 523
D5 = 587
E5 = 659
F5 = 698
G5 = 784
A5 = 880
B5 = 988
C6 = 1047

# "Korobeiniki" (Tetris Theme) melody (Note, Duration)
tetris_melody = [
    (E5, 0.25), (B4, 0.125), (C5, 0.125), (D5, 0.25), (C5, 0.125), (B4, 0.125), (A4, 0.25), 
    (A4, 0.125), (C5, 0.125), (E5, 0.25), (D5, 0.125), (C5, 0.125), (B4, 0.25), (B4, 0.125), (C5, 0.125), 
    (D5, 0.25), (E5, 0.25), (C5, 0.25), (A4, 0.25), (A4, 0.5),
    (D5, 0.25), (F5, 0.125), (A5, 0.25), (G5, 0.125), (F5, 0.125), (E5, 0.25), (C5, 0.125), (E5, 0.125), 
    (D5, 0.25), (C5, 0.125), (B4, 0.125), (B4, 0.25), (E5, 0.25), (C5, 0.25), (A4, 0.25), (A4, 0.5),
    (E4, 0.25), (C4, 0.125), (D4, 0.125), (E4, 0.25), (D4, 0.125), (C4, 0.125), (B3, 0.25), (B3, 0.125), 
    (D4, 0.125), (F4, 0.25), (E4, 0.125), (D4, 0.125), (C4, 0.25), (C4, 0.125), (D4, 0.125), (E4, 0.25), 
    (F4, 0.25), (D4, 0.25), (B3, 0.25), (B3, 0.5),
    (G4, 0.25), (B4, 0.125), (D5, 0.25), (C5, 0.125), (B4, 0.125), (A4, 0.25), (F4, 0.125), (A4, 0.125), 
    (G4, 0.25), (F4, 0.125), (E4, 0.125), (E4, 0.25), (E4, 0.25), (C4, 0.25), (A3, 0.25), (A3, 0.5)
]

try:
    for note, duration in tetris_melody:
        if note == 0:
            time.sleep(duration)
        else:
            pwm.ChangeFrequency(note)
            time.sleep(duration)
except KeyboardInterrupt:
    pass
finally:
    pwm.stop()  # Stop PWM
    GPIO.cleanup()  # Reset GPIO pins
