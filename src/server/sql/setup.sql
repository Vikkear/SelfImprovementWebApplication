-- Creates the database
CREATE DATABASE
IF NOT EXISTS selfimprovement;

-- Handles premissions.
DROP USER IF EXISTS 'user'@'%';

GRANT ALL ON selfimprovement.* TO user@localhost
IDENTIFIED BY 'pass';

  
FLUSH PRIVILEGES;
