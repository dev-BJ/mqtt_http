CREATE TABLE "device_state" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientid" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"event" varchar(255) NOT NULL,
	"time" timestamp with time zone NOT NULL,
	"reason" varchar(255),
	"peername" varchar(255),
	"peerhost" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "device_state_clientid_unique" UNIQUE("clientid"),
	CONSTRAINT "device_state_topic_unique" UNIQUE("topic")
);
--> statement-breakpoint
CREATE TABLE "payload" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"payload" json NOT NULL,
	"time" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payload" ADD CONSTRAINT "payload_client_id_device_state_clientid_fk" FOREIGN KEY ("client_id") REFERENCES "public"."device_state"("clientid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload" ADD CONSTRAINT "payload_topic_device_state_topic_fk" FOREIGN KEY ("topic") REFERENCES "public"."device_state"("topic") ON DELETE no action ON UPDATE no action;