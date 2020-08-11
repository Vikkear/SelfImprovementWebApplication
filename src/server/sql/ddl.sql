USE selfimprovement;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Trackers;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Todolists;
DROP TABLE IF EXISTS Quests;

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

        CREATE TABLE Quests
        (
            username VARCHAR(30),
            title VARCHAR(50),
            quest VARCHAR(500),
            start_date DATE NOT NULL,
            finish_date DATE
        );