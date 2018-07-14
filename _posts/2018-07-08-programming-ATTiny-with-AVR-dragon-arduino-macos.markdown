---
layout: post
title: Programming the ATTiny with AVR Dragon and the Arduino IDE on macOS in 2018
date: 2018-07-08 19:00:00 +1000
comments: true
categories: IOT
---

Recently I've been [working on a project][diy-bms-partslist] utilising ATTiny85 microcontrollers and Arduino. At first glance it wasn't obvious if it was possible to use the [AVR Dragon][avr-dragon] with Arduino or macOS High Sierra, but after some trial and error it turns out the Arduino toolchain supports programming via ISP on the Dragon quite well!

In addition to ISP programming on macOS, there was an extra step required to to power the ATTiny from the Dragon, I have covered that below.

<img src="/images/diybms-avr-dragon-setup.jpg" alt="ATTiny85 connected to AVR Dragon on macOS via ISP" />

### macOS, Dragon, ATTiny, Arduino in 2018

Current production versions of the [Arduino IDE][arduino-cc] (1.8.5), it's bundled version of avrdude ([modified][avr-dude-arduino] 6.3) and [ATTinyCore][attiny-core] (1.1.5) all work 'out of the box' and macOS High Sierra (10.13.5) requires no additional kernel extensions or drivers to use the Dragon, unlike the [ATMEL ICE][ice-kext].

Easy to find articles on running the Dragon on macOS were written prior to the renaming of Mac OS X to macOS (2016) and the addition of the *Library Manager* and *Board Manager* in Arduino 1.6.x (early 2015). [James Gregson][james-gregson] (2012) and [Jay Wiggins][jay-wiggins] (2015) write about using the Dragon on *Mac OS X* and demonstrate the installation of avr toolchain components like [avrdude][avrdude], avr-libc, and [avr-crosspack][avr-crosspack] via homebrew rather than using Arduino.

Jay mentions as a foot note, the possibility of requiring a custom kernel extension to run the Dragon since the [ATMEL ICE][ice-kext] requires one. This looked sensible given the ATMEL ICE's requirement but it is unnecessary. From my experience the Dragon **does not** require a custom kernel extension to operate on a mac.


### Setup Arduino, ATTinyCore

Download the Arduino IDE package from [arduino.cc][arduino-cc] and add ATTiny support with [SpenceKonde/ATTinyCore][attiny-core] using the "Additional Boards Manager URLs" setting. ATTinyCore has detailed installation [instructions][attiny-core-install].

<img class="center" src="/images/arduino-additional-boardsmanager-urls.jpg" alt="Arduino IDE 1.8.5 Additional Boards Manager URLS settings dialog" />

While you're in settings enable "Show verbose output during: upload" to see more output when Arduino is interacting with the Dragon via avrdude.

<img class="center" src="/images/arduino-ide-verbose-output.jpg" alt="Arduino IDE 1.8.5 Verbose output during upload settings dialog" />


### Using AVR Dragon as a Programmer

**Note:** The Dragon will not appear as an option in the list of available ports like you would see an Arduino Uno or a USB serial programmer.

Open a project you'd like to flash to your ATTiny, from the Tools menu set the appropriate board (ATTiny 25/45/85) and select the programmer "AVR Dragon ISP mode (ATTinyCore)".

<img class="center" src="/images/arduino-select-board.jpg" alt="Arduino IDE 1.8.5 Select ATTiny board ATTinyCore" />

<img class="center" src="/images/arduino-select-programmer.jpg" alt="Arduino IDE 1.8.5 Select programmer for AVR Dragon" />

Select "Upload" and if you've set verbose mode as highlighted above, you'll see all the verbose output from Arduino (avrdude) communicating with the Dragon.

A basic command to test the Dragon's connectivity would be:

```bash
~/Library/Arduino15/packages/arduino/tools/avrdude/6.3.0-arduino9/bin/avrdude \
-C ~/Library/Arduino15/packages/ATTinyCore/hardware/avr/1.1.5/avrdude.conf \
-p attiny85 -vvvv -c dragon_isp -P usb
```

The output with `-vvvv` is very verbose. The number of `v`s can be reduced.

### Setting Fuses

ATTiny85 doesn't use a bootloader like a normal Arduino, but the "Burn Bootloader" item in the Tools menu can be used to set fuses. Read the descriptions on the different ATTiny fuses over on the [ATTinyCore README][attiny-core-readme].

### Powering ATTiny from Dragon

Given my ATTiny chips don't have their own power source, after connecting the ISP headers of the Tiny's board and attempting up upload via Dragon I encountered this error:

```bash
avrdude: jtagmkII_setparm(): bad response to set parameter command: RSP_NO_TARGET_POWER
```

An article by [Josh Levine][dragon-power] shows an easy way to provide power to the ATTiny via the ISP cable by placing a jumper from one of the the Dragon's VCC pins to the unutilised JTAG pin 4. A continuity test with a multimeter shows JTAG pin 4 and SPI pin 2 are connected.

The image below shows a simple jumper from VCC to JTAG pin 4.

<img class="center" src="/images/dragon-jtag-pin4-vcc.jpg" alt="Power ATTiny with AVR Dragon JTAG pin 4 to VCC" />

In hindsight, section 4.5 on SPI programming in the [Dragon User Guide][dragon-user-guide] mentions this power requirement since my ATTiny is essentially 'on board':

> AVR Dragon must sense the target voltage on pin 2 on the SPI header in order to set up the level- converters. For on-board targets, the voltage must be supplied from pin 2, 4, 6 on the VCC header (5V) into pin 2 (VTG) on the SPI header. 


### Footnote: Updating Dragon Firmware

The current version of AVR Dragon firmware is `7.39`. My Dragon purchased June 2018 came with an older version out of the box. As far as I'm aware to update the Dragon's firmware you will need to use Atmel Studio on a Windows machine or boot up a Windows VM.

I'm unsure whether or not the firmware update is necessary to run the steps above.

[attiny-core-readme]: https://github.com/SpenceKonde/ATTinyCore#changing-the-attiny-clock-speed-and-other-settings
[attiny-core-install]: https://github.com/SpenceKonde/ATTinyCore/blob/master/Installation.md
[avr-dragon]: https://www.microchip.com/DevelopmentTools/ProductDetails/ATAVRDRAGON
[diy-bms-partslist]: https://gist.github.com/jessedc/d2d2814aa0662db6a170677c99e3ad0c
[arduino-cc]: https://www.arduino.cc/en/Main/Software
[dragon-user-guide]: http://ww1.microchip.com/downloads/en/devicedoc/atmel-42723-avr-dragon_userguide.pdf
[dragon-power]: https://wp.josh.com/2014/12/12/easy-hack-to-allow-an-avr-dragon-to-power-the-target-device-over-the-isp-cable/
[avr-dude-arduino]: https://github.com/arduino/avrdude-build-script
[ice-kext]: https://www.avrfreaks.net/forum/atmelice-signed-dummy-kext-macos-x-high-sierra
[avr-crosspack]: https://github.com/obdev/CrossPack-AVR
[avrdude]: http://www.nongnu.org/avrdude/
[attiny-core]: https://github.com/SpenceKonde/ATTinyCore
[james-gregson]: http://jamesgregson.blogspot.com/2012/02/avr-development-with-amtel-avr-dragon.html
[jay-wiggins]: http://jaywiggins.com/avr/dragon/attiny/avrdude/avr-gcc/osx/2015/08/29/avr-dragon-and-os-x-trying-it-out-again/