create database NokiaHqEmotions;

use NokiaHqEmotions

create table emotions(
    id int auto_increment,
    emotion_id int not null,
    created_at datetime default current_timestamp,
    primary key(id)
);

insert into emotions (emotion_id, created_at) VALUES ('1', '2023.03.23 14:57');