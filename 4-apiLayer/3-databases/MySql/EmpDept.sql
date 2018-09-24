
CREATE TABLE employee (
    employee_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    last_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    notes MEDIUMTEXT,
    dept_no INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (employee_id),
    INDEX (last_name),
    INDEX (dept_no),
    UNIQUE (email),
    FOREIGN KEY (dept_no)
        REFERENCES department (dept_no)
)
ENGINE=InnoDB;

CREATE TABLE department (
    dept_no    INTEGER UNSIGNED NOT NULL,
    dept_name  VARCHAR(14) NOT NULL,
    loc       VARCHAR(13) NOT NULL,
    PRIMARY KEY (dept_no)
)
ENGINE=InnoDB;


--desc department;
--desc employee;

/* department data */
insert into department (dept_no, dept_name, loc) values (10, 'Management', 'London');

insert into department (dept_no, dept_name, loc) values (20, 'HR', 'London');

insert into department (dept_no, dept_name, loc) values (30, 'Sales', 'UK');

insert into department (dept_no, dept_name, loc) values (60, 'IT', 'Egham');

/* employee data */
insert into employee (employee_id, last_name, first_name, email, hire_date, dept_no) values (1, 'Steve', 'Palmer', 'Steve@office.com', str_to_date('2016-07-26 00:00:00', '%Y-%m-%d %T'), 60);

insert into employee (employee_id, last_name, first_name, email, hire_date, dept_no) values (2, 'Bob', 'Jones', 'Bob@office.com', str_to_date('2016-01-01 00:00:00', '%Y-%m-%d %T'), 10);

insert into employee (employee_id, last_name, first_name, email, hire_date, dept_no) values (3, 'Frank', 'Money', 'Frank@office.com', str_to_date('2014-03-15 00:00:00', '%Y-%m-%d %T'), 30);

insert into employee (employee_id, last_name, first_name, email, hire_date, dept_no) values (4, 'Super', 'Star', 'SuperStar@office.com', str_to_date('2013-07-01 00:00:00', '%Y-%m-%d %T'), 60);


