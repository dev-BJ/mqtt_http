from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/{topic}")
def post_message(topic: str, message: str):
    # Here you would typically publish the message to the MQTT broker
    print(f"Publishing message to topic {topic}: {message}")
    return {"topic": topic, "message": message}