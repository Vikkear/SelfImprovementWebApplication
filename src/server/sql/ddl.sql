USE selfimprovement;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Trackers;
DROP TABLE IF EXISTS Categories;

CREATE TABLE Users
(
    username VARCHAR(30),
    password VARCHAR(30)
);

CREATE TABLE Trackers
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR
    (30),
    dateSubmitted TIMESTAMP NOT NULL,
    category VARCHAR
    (30),
    amount INT NOT NULL
);

    CREATE TABLE Categories
    (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
category VARCHAR
        (30)
);

        CREATE TABLE Todolists
        (
            username VARCHAR(30) PRIMARY KEY,
            todo VARCHAR(500)
        );

