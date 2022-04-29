export const dropEventTableSQL = "DROP TABLE IF EXISTS event";
export const dropMemberTableSQL = "DROP TABLE IF EXISTS member";

export const insertEventSQL =
  "INSERT INTO event (city, country, county, date, state, type, member_id) VALUES ?";
export const insertMemberSQL =
  "INSERT INTO member(father, first_name, gender, last_name, middle_name, mother, spouse, status, suffix, maiden_name) VALUES  ?";

// reorder the columns to match JSON props
export const createMemberTableSQL = `CREATE TABLE member (
    family_branch_id VARCHAR(240),
    date_of_birth DATE,
    date_of_death DATE,
    fatherId VARCHAR(240),
    first_name VARCHAR(240), 
    gender INT UNSIGNED,
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(240), 
    maiden_name VARCHAR(240), 
    middle_name VARCHAR(240), 
    motherId VARCHAR(240),
    spouseId VARCHAR(240),
    marriage_status INT UNSIGNED, 
    suffix INT UNSIGNED
)`;

export const createEventTableSQL = `CREATE TABLE event (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city INT UNSIGNED, 
    country INT UNSIGNED, 
    county INT UNSIGNED,
    date DATE,
    state INT UNSIGNED,
    type INT UNSIGNED,
    member_id INT UNSIGNED
)`;
