CREATE TABLE IF NOT EXISTS "category" (
    "id" TEXT NOT NULL DEFAULT short_id_v2(10),
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("id")
);