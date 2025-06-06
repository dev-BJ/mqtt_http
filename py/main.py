from fastapi import FastAPI, Response

app = FastAPI()

@app.get("/")
def read_root():
    return Response(content="Hello, World!", headers={"ngrok-skip-browser-warning": "true"})

@app.post("/mqtt_device")
def post_message(topic: str, message: str):
    # Here you would typically publish the message to the MQTT broker
    print(f"Publishing message to topic {topic}: {message}")
    return {"topic": topic, "message": message}