CREATE TABLE users
(
    id SERIAL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role SMALLINT NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users(username,email,password,role) VALUES ('admin', '', '123456', '0'); 