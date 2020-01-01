USE selfimprovement;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Trackers;

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
    (30)
);

