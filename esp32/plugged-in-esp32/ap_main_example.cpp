#include <WiFi.h>
#include <WebServer.h>

const char *ssid = "ESP32-AP";
const char *password = "123456789";

WebServer server(80);

void handlePost() {
  if (server.hasArg("plain") == false) { // Check if body is present
    server.send(400, "text/plain", "Body not received");
    return;
  }
  
  String body = server.arg("plain");
  Serial.println("Received body: " + body);

  // Assuming body contains JSON or URL-encoded data
  // You can parse the body content here if necessary

  server.send(200, "text/plain", "Values received successfully");
}

void setup() {
  Serial.begin(115200);

  // Set up the ESP32 in AP mode
  WiFi.softAP(ssid, password);
  Serial.println("AP mode started");
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());

  // Handle POST requests
  server.on("/post", HTTP_POST, handlePost);

  server.begin();
}

void loop() {
  server.handleClient();
}
