CREATE TABLE users (
    username VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_name VARCHAR(100)
    CONSTRAINT fk_name FOREIGN KEY (user_name) REFERENCES users(username)
);

INSERT INTO users (username, name, password) VALUES ('admin', 'Administrator', 'admin');
