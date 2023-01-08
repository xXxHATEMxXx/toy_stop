CREATE TABLE IF NOT EXISTS `Users` (
  `email` VARCHAR(255) NOT NULL ,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
);

INSERT INTO `users` (`email`, `password`, `firstName`, `LastName`) VALUES
('Mediserve14@gmail.com', '123456789', 'Mohamed', 'Mohamed'),
('Mohamed.shahin@gmail.com', '987654321', 'Hatem', 'Shahin');