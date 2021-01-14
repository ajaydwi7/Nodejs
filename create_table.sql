create table people(
people_id int(11) primary key auto_increment,
people_name varchar(200),
people_Email varchar(200) unique,
people_ph int(10),
people_gender varchar(20)
)engine = InnoDB;
