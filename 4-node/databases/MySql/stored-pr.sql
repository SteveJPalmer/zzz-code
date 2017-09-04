
DELIMITER $$
CREATE PROCEDURE rental_report (
    IN cust_id INTEGER UNSIGNED,
    OUT film_count TINYINT
) BEGIN
    DECLARE cust_name VARCHAR(92);
    DECLARE i INTEGER;
    -- cursors must be declared after all other variables
    DECLARE curs CURSOR FOR SELECT
        UCWords(CONCAT(c.last_name, ', ', c.first_name)),
        COUNT(i.film_id)
    FROM
        rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN customer c ON r.customer_id = c.customer_id
    WHERE
        r.return_date IS NULL
        AND r.customer_id = cust_id
    GROUP BY
        r.customer_id;
    OPEN curs;
    IF FOUND_ROWS() > 0 THEN
        FETCH curs INTO cust_name, film_count;
        -- header
        (SELECT
            cust_id AS `CUSTOMER ID`,
            cust_name AS `CUSTOMER NAME`,
            film_count AS `RENTALS`)
				UNION
        -- list film rentals
        (SELECT
            ' ', ' ', UCWords(f.title)
        FROM
            rental r
            JOIN inventory i ON r.inventory_id = i.inventory_id
					  JOIN film f ON i.film_id = f.film_id
        WHERE
            r.return_date IS NULL
            AND r.customer_id = cust_id
        ORDER BY f.title);
    ELSE
        SET film_count = 0;
        SELECT
            customer_id AS `CUSTOMER ID`,
            UCWords(CONCAT(last_name, ', ', first_name))
              AS `CUSTOMER NAME`,
            0 AS `RENTALS`
        FROM
            customer
        WHERE
            customer_id = cust_id;
END IF;
    CLOSE curs;
END$$
DELIMITER ;
