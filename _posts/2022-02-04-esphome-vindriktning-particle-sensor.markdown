---
layout: post
title: "ESPHome VINDRIKTNING Particle Sensor"
date: 2022-02-04 16:00:00 +1100
comments: true
categories: IOT
---

The IKEA [VINDRIKTNING][ikea-vindriktning] is a simple and cheap ($15 AUD) air quality sensor that measures PM 2.5 particulate matter. It's easy to attach an ESP8266 to three test points on the device's PCB to read the communication between the sensor and the onboard IC. 

I have published a small project based on the excellent work of Soren Beye in the [Hypfer/esp8266-vindriktning-particle-sensor][hypfer-repo] project that wraps the functionality into a custom [ESPHome external component][esphome-external-components] that can be pulled into any ESPHome configuration. The full source is available on [GitHub][github-repo].

<div class="image-pair">
  <figure>
    <img src="/images/2022-02-04/home_assistant1.png" alt="VINDRIKTNING device in Home Assistant" />
    <figcaption>Device in Home Assistant</figcaption>
  </figure>
  <figure>
    <img src="/images/2022-02-04/home_assistant2.png" alt="PM 2.5 values over time in Home Assistant" />
    <figcaption>PM 2.5 over time</figcaption>
  </figure>
</div>

### Why ESPHome?

Most of the boilerplate code and configuration in the original project can be abstracted away by ESPHome. Things like wifi configuration, OTA updates, Home Assistant auto discovery and integration, and UART setup can all be configured with a simple YAML file rather than writing and maintaining C++ firmware.

The original project contains a moving average value for the sensor. This can be replicated with a [sliding_window_moving_average][esphome-sliding-average] filter on the sensor, keeping the configuration declarative.

### Prerequisites

To attach your ESP8266 to the VINDRIKTNING sensor, follow the excellent build instructions contained within the [original Hypfer README][hypfer-readme]. It covers the wiring of the three connections: ground, 5V, and the single data pin.

### Example Configuration

A complete ESPHome [YAML configuration][example-yaml] for the sensor looks like this:

```yaml
esphome:
    name: vindriktning-pm-1
    platform: ESP8266
    board: d1

external_components:
- source: github://jessedc/esphome-vindriktning-particle-sensor@main
  components: [ vindriktning ]
  refresh: 0s

logger:

api:

ota:
    password: !secret ota_password

wifi:
    ssid: !secret wifi_ssid
    password: !secret wifi_password

uart:
    id: uart_bus
    rx_pin: GPIO4
    tx_pin: GPIO5 # Unused
    baud_rate: 9600

sensor:
- platform: vindriktning
  id: uart_vindrikning_pm25
  name: PM 2.5μm
  filters:
    - sliding_window_moving_average:
        window_size: 5
        send_every: 5
```

### Example Log Output

Once running, the ESPHome log shows the raw PM 2.5 readings from the sensor and the averaged values being sent to Home Assistant:

```
[22:07:10][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:12][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:33][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:34][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:36][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:36][D][sensor:125]: 'PM 2.5μm': Sending state 15.00000 µg/m³ with 0 decimals of accuracy
[22:07:38][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:41][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:43][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:07:45][D][vindriktning:031]: Received PM 2.5 reading: 15
[22:08:06][D][vindriktning:031]: Received PM 2.5 reading: 17
[22:08:06][D][sensor:125]: 'PM 2.5μm': Sending state 15.40000 µg/m³ with 0 decimals of accuracy
```

### Build Photos

I followed the [build instructions][hypfer-readme] to build my own ESP8266 powered VINDRIKTNING sensor, wiring up ground, 5V and the single data pin then stuffing it all back into the enclosure.

<div class="image-pair">
  <figure>
    <img src="/images/2022-02-04/build1.jpg" alt="VINDRIKTNING PCB with wires attached" />
    <figcaption>PCB with wires</figcaption>
  </figure>
  <figure>
    <img src="/images/2022-02-04/build2.jpg" alt="Wemos D1 Mini attached to VINDRIKTNING PCB" />
    <figcaption>Wemos D1 Mini attached</figcaption>
  </figure>
</div>

### Footnote

This post was created in February 2026 from the project's README. The project was originally built and published in early 2022.

[github-repo]: https://github.com/jessedc/esphome-vindriktning-particle-sensor
[ikea-vindriktning]: https://www.ikea.com/au/en/p/vindriktning-air-quality-sensor-50498243/
[hypfer-repo]: https://github.com/Hypfer/esp8266-vindriktning-particle-sensor
[hypfer-readme]: https://github.com/Hypfer/esp8266-vindriktning-particle-sensor#readme
[esphome-external-components]: https://esphome.io/components/external_components.html
[esphome-sliding-average]: https://esphome.io/components/sensor/index.html#sliding-window-moving-average
[example-yaml]: https://github.com/jessedc/esphome-vindriktning-particle-sensor/blob/main/example_vindriktning.yaml
