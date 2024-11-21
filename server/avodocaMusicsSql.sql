use avodocamusics;

CREATE TABLE `accounts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(255),
  `role_id` int,
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updtaedAt` timestamp
);

CREATE TABLE `follows` (
  `following_user_id` int,
  `followed_user_id` integer,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `playlists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `account_id` int,
  `name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `description` varchar(255),
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `playlistSongs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `songs_id` int,
  `playlist_id` int,
  `order` int NOT NULL,
  `status` tinyint NOT NULL
);

CREATE TABLE `albums` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `account_id` int,
  `name` varchar(50) NOT NULL,
  `artist_id` int,
  `description` varchar(255),
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `albumSongs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `songs_id` int,
  `album_id` int,
  `order` int NOT NULL,
  `status` tinyint NOT NULL
);

CREATE TABLE `songs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `description` varchar(255),
  `genre_id` int,
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `history_upload` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `song_id` int,
  `account_id` int,
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `history_listen` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `song_id` int,
  `account_id` int,
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `artists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `bio` text,
  `debutDate` datetime NOT NULL,
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `artistSongs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `artist_id` int,
  `song_id` int,
  `order` int NOT NULL,
  `status` tinyint NOT NULL
);

CREATE TABLE `genres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255),
  `status` tinyint NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `userFavoriteSongs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `song_id` int
);

CREATE TABLE `userFavoriteAlbums` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `album_id` int
);

CREATE TABLE `userFavoritePlaylists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `playlist_id` int
);

CREATE TABLE `userFavoriteSingles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `single_id` int
);

CREATE TABLE `singles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `account_id` int,
  `song_id` int,
  `name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `status` tinyint NOT NULL,
  `description` varchar(255),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `singleSongs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `song_id` int UNIQUE,
  `single_id` int UNIQUE,
  `status` tinyint NOT NULL
);

ALTER TABLE `accounts` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `follows` ADD FOREIGN KEY (`following_user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `follows` ADD FOREIGN KEY (`followed_user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `playlists` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `playlistSongs` ADD FOREIGN KEY (`songs_id`) REFERENCES `songs` (`id`);

ALTER TABLE `playlistSongs` ADD FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

ALTER TABLE `albums` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `albums` ADD FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

ALTER TABLE `albumSongs` ADD FOREIGN KEY (`songs_id`) REFERENCES `songs` (`id`);

ALTER TABLE `albumSongs` ADD FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`);

ALTER TABLE `songs` ADD FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

ALTER TABLE `history_upload` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `history_upload` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `history_listen` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `history_listen` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `artistSongs` ADD FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

ALTER TABLE `artistSongs` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `userFavoriteSongs` ADD FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `userFavoriteSongs` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `userFavoriteAlbums` ADD FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `userFavoriteAlbums` ADD FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`);

ALTER TABLE `userFavoritePlaylists` ADD FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `userFavoritePlaylists` ADD FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

ALTER TABLE `userFavoriteSingles` ADD FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `userFavoriteSingles` ADD FOREIGN KEY (`single_id`) REFERENCES `singles` (`id`);

ALTER TABLE `singles` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `singles` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `singleSongs` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

ALTER TABLE `singleSongs` ADD FOREIGN KEY (`single_id`) REFERENCES `singles` (`id`);
