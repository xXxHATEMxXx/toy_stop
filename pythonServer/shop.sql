CREATE DATABASE IF NOT EXISTS `shop`;


USE `shop`;


CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `shoppingCart` (
  `email` VARCHAR(255) NOT NULL ,
  `ID_ITEMS` varchar(255) NOT NULL ,
  `Quantity` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `email` VARCHAR(255) NOT NULL ,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL
);



INSERT INTO `items` (`name`, `brand`, `description`, `price`, `image`) VALUES
('Teddy Bear', 'LotFancy', 'A cute teddy bear', 14.99, 'teddy-bear.png'),
('Doll', 'Barbie', 'A sweet doll', 9.48, 'doll.png'),
('Toy Car 1', 'Hot Wheels', 'A cute datsun toy car', 57.14, 'toy-car-1.png'),
('Toy Car 2', 'Hot Wheels', 'A cute ford toy truck', 39.99, 'toy-car-2.png'),
('Toy Car 3', 'Hot Wheels', 'A cute mercedes toy racecar', 54.74, 'toy-car-3.png'),
('Lego Classics', 'Lego', 'A cute lego monsters set', 9.97, 'lego-monsters.png'),
('Lego Dots', 'Lego', 'A cute lego dots set', 17.94, 'lego-dots.png'),
('Sweet Jumperoo', 'Fisher-Price', 'A sweet ride jumperoo', 124.99, 'ride-jumperoo.png'),
('Musical Keyboard', 'CoComelon', 'A sweet musical keyboard', 26.99, 'musical-keyboard.png'),
('T-Shirt & Shorts Set 1', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-1.png'),
('T-Shirt & Shorts Set 2', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-2.png'),
('T-Shirt & Shorts Set 3', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-3.png'),
('N-Strike Blaster', 'Nerf', 'A powerful blaster gun', 34.99, 'strike-blaster.png'),
('Baby Mickey Mouse', 'Disney', 'A sweet baby Mickey plush', 18.88, 'baby-mickey.png'),
('Baby Minnie Mouse', 'Disney', 'A sweet baby Minnie plush', 51.23, 'baby-minnie.png'),
('3D Toddler Scooter', 'Bluey', 'A fantastic 3-wheel scooter', 29.00, 'toddler-scooter.png'),
('Cottage Playhouse', 'Litte Tikes', 'A fancy blue playhouse', 139.99, 'cottage-playhouse.png'),
('2-in-1 Motor/Wood Shop', 'Little Tikes', 'A realistic motor/wood shop', 99.00, '2x1-motor-shop.png'),
('UNO Collector Tin', 'UNO', 'A premium quality uno set', 49.39, 'uno-phase10-snappy.png'),
('Razor MX350 Bike', 'Razor', 'A powerful electric bike', 328.00, 'mx350-bike.png');

INSERT INTO `shoppingCart` (`email`, `ID_ITEMS`, `Quantity`) VALUES
('Mediserve14@gmail.com', '', ''),
('Mohamed.shahin@gmail.com', '1,4,13,17', '1,2,3,4');


INSERT INTO `users` (`email`, `password`, `firstName`, `LastName`) VALUES
('Mediserve14@gmail.com', '123456789', 'Mohamed', 'Mohamed'),
('Mohamed.shahin@gmail.com', '987654321', 'Hatem', 'Shahin');