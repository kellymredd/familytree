export const dropEventTableSQL = "DROP TABLE IF EXISTS event";
export const dropMemberTableSQL = "DROP TABLE  IF EXISTS member";

export const insertEventSQL =
  "INSERT INTO event (city, country, county, date, state, type, member_id) VALUES ?";
export const insertMemberSQL =
  "INSERT INTO member (father, first_name, gender, last_name, middle_name, mother, spouse, status, suffix, maiden_name) VALUES ?";

export const createMemberTableSQL = `CREATE TABLE member (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    father VARCHAR(240),
    first_name VARCHAR(240), 
    gender INT UNSIGNED,
    last_name VARCHAR(240), 
    middle_name VARCHAR(240), 
    mother VARCHAR(240),
    spouse INT UNSIGNED,
    status INT UNSIGNED, 
    suffix INT UNSIGNED, 
    maiden_name VARCHAR(40)
)`;

export const createEventTableSQL = `CREATE TABLE event (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city INT UNSIGNED, 
    country INT UNSIGNED, 
    county INT UNSIGNED,
    date INT UNSIGNED,
    state INT UNSIGNED,
    type INT UNSIGNED,
    member_id INT UNSIGNED
)`;
