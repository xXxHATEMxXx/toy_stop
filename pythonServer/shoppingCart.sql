CREATE TABLE IF NOT EXISTS `shoppingCart` (
  `email` VARCHAR(255) NOT NULL ,
  `ID_ITEMS` varchar(255) NOT NULL,
  `Quantity` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
);

INSERT INTO `shoppingCart` (`email`, `ID_ITEMS`, `Quantity`) VALUES
('Mediserve14@gmail.com', '', ''),
('Mohamed.shahin@gmail.com', '1,4,13,17', '1,2,3,4');
