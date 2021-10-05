CREATE TABLE celebrities (
   id serial primary key,
   name varchar(255) default null,
   image varchar(100),
   url varchar(255),
   profession json,
   dob varchar(255),
   physical_body_info json,
   family_info json,
   education json,
   category varchar(20),
   created timestamp default now(),
   updated timestamp default now()
);
