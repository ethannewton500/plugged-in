#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <HTTPClient.h>

#include "env_var.h"

WebServer server(80);

bool wifiConnected = false;

void checkButtons();
void rainbowMode();
void checkWiFi();

int redValue[3] = {255, 0, 0};
int greenValue[3] = {0, 255, 0};
int blueValue[3] = {0, 0, 255};

int* colors[3] = {redValue, greenValue, blueValue};

int offValue[3] = {0, 0, 0};

const int colorButtonPin = 16;
int colorButtonState = HIGH;
int lastColorButtonState = HIGH;

static int colorIndex = 0;

const int offButtonPin = 4;
int offButtonState = HIGH;
int lastOffButtonState = HIGH;

static int offIndex = 0;

const int rainbowButtonPin = 17;
int rainbowButtonState = HIGH;
int lastRainbowButtonState = HIGH;
bool rainbowOn = false;

const int redPin = 18;
const int greenPin = 5;
const int bluePin = 19;

int r = 255;
int g = 0;
int b = 0;

static String macAddress;

void setColor(int color[3]) {
  ledcWrite(0, color[0]);
  ledcWrite(1, color[1]);
  ledcWrite(2, color[2]);
}

void setColorRGB(int red, int green, int blue) {
  ledcWrite(0, red);
  ledcWrite(1, green);
  ledcWrite(2, blue);
}

void handlePower() {
  if (server.hasArg("power")) {
    String power = server.arg("power");
    if (power == "on") {
      Serial.println("Power on");
      setColor(colors[colorIndex]);
      server.send(200, "application/json", "{\"power\": \"on\"}");
    } else if (power == "off") {
      Serial.println("Power off");
      setColor(offValue);
      server.send(200, "application/json", "{\"power\": \"off\"}");
    }
  } else {
    if (offIndex == 0) {
      offIndex = 1;
      rainbowOn = false;
      setColor(offValue);
      server.send(200, "application/json", "{\"power\": \"off\"}");
    } else {
      offIndex = 0;
      rainbowOn = false;
      setColor(colors[colorIndex]);
      server.send(200, "application/json", "{\"power\": \"on\"}");
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(2000);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");

  server.on("/power", handlePower);
  server.begin();
  Serial.println("HTTP server started");

  macAddress = WiFi.macAddress();
  macAddress.replace(":", "");
  Serial.println(macAddress);

  if (!MDNS.begin(macAddress)) {
    Serial.println("Error setting up MDNS responder!");
  }
  Serial.println("MDNS server started");

  pinMode(colorButtonPin, INPUT_PULLUP);
  pinMode(offButtonPin, INPUT_PULLUP);
  pinMode(rainbowButtonPin, INPUT_PULLUP);

  ledcSetup(0, 5000, 8);
  ledcSetup(1, 5000, 8);
  ledcSetup(2, 5000, 8);

  ledcAttachPin(redPin, 0);
  ledcAttachPin(greenPin, 1);
  ledcAttachPin(bluePin, 2);

  setColor(redValue);
}

void rainbowMode() {
  r = 255;
  g = 0;
  b = 0;

  while (rainbowOn) {
    for (g = 0; g < 255; g++) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
    for (r = 255; r > 0; r--) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
    for (b = 0; b < 255; b++) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
    for (g = 255; g > 0; g--) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
    for (r = 0; r < 255; r++) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
    for (b = 255; b > 0; b--) {
      setColorRGB(r, g, b);
      delay(5);
      checkButtons();
      if (!rainbowOn) return;
    }
  }
}

void checkButtons() {
  colorButtonState = digitalRead(colorButtonPin);
  offButtonState = digitalRead(offButtonPin);
  rainbowButtonState = digitalRead(rainbowButtonPin);

  if (colorButtonState != lastColorButtonState) {
    if (colorButtonState == LOW) {
      Serial.println("Color button pressed");
      colorIndex = (colorIndex + 1) % 3;
      rainbowOn = false;
      setColor(colors[colorIndex]);
      offIndex = 0;
    }
  }

  if (offButtonState != lastOffButtonState) {
    if (offButtonState == LOW) {
      Serial.println("Off button pressed");
      if (offIndex == 0) {
        offIndex = 1;
        rainbowOn = false;
        setColor(offValue);
      } else {
        offIndex = 0;
        rainbowOn = false;
        setColor(colors[colorIndex]);
      }
    }
  }

  if (rainbowButtonState != lastRainbowButtonState) {
    if (rainbowButtonState == LOW) {
      Serial.println("Rainbow button pressed");
      rainbowOn = !rainbowOn;
      if (!rainbowOn) {
        setColor(colors[colorIndex]);
      }
    }
  }

  lastColorButtonState = colorButtonState;
  lastOffButtonState = offButtonState;
  lastRainbowButtonState = rainbowButtonState;
}

void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Attempting to reconnect...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);

    unsigned long startAttemptTime = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
      Serial.print(".");
      delay(500);
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nReconnected to WiFi.");
      Serial.print("IP address: ");
      Serial.println(WiFi.localIP());
    } else {
      Serial.println("\nFailed to reconnect to WiFi.");
    }
  }
}

void loop() {
  server.handleClient();

  checkWiFi();

  checkButtons();

  if (rainbowOn) {
    rainbowMode();
  }
}
