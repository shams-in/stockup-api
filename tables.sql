CREATE TABLE
IF NOT EXISTS "category"
(
    "id" TEXT NOT NULL DEFAULT short_id_v2
(10),
    "name" VARCHAR
(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW
(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW
(),
    PRIMARY KEY
("id")
);

CREATE TABLE
IF NOT EXISTS "item"
(
    "id" TEXT NOT NULL DEFAULT short_id_v2
(10),
    "name" VARCHAR
(255) NOT NULL UNIQUE,
    "category_id" TEXT NOT NULL REFERENCES "category"
("id"),
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW
(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW
(),
    PRIMARY KEY
("id")
);