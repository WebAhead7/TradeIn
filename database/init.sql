BEGIN;

DROP TABLE IF EXISTS users, trade_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE trade_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT,
  trade_in VARCHAR(100)NOT NULL ,
  trade_out VARCHAR(100)NOT NULL 
);

INSERT INTO users (username, email, password,location) VALUES
  ('Sery1976','Sery1976@mail.com' , '123123', 'Middlehill, UK'),
  ('Notne1991','Notne1991@mail.com' ,'123123','Sunipol, UK'),
  ('Moull1990','Moull1990@mail.com','123123', 'Wanlip, UK'),
  ('Spont1935','Spont1935@mail.com' ,'123123','Saxilby, UK'),
  ('Precand', 'Precand@mail.com', '123123','Stanton, UK')
;

INSERT INTO trade_posts (text_content,trade_in, trade_out,user_id) VALUES
  ('Announcing of invitation principles in.', 'football','nike sneakrs n10' ,1),
  ('Peculiar trifling absolute and wandered yet.','nike sneakrs n10','football', 2),
  ('Far stairs now coming bed oppose hunted become his.','btata','iphone 7' ,3),
  ('Curabitur arcu quam, imperdiet ac orci ac.','iphone 7','btata', 4),
  ('Aenean blandit risus sed pellentesque.','iphone 4','orange', 5)
;
COMMIT;