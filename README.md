https://mqtt-http.vercel.app/
{"client_id":${clientid},"username":${username},"topic":${topic},"payload":${payload},"time":${time}}
SELECT
  payload,
  clientid,
  topic,
  username,
  timestamp as time
FROM
  "CleanEnv/#",
  "$events/client_connected",
  "$events/client_disconnected"