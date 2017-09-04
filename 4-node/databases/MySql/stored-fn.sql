
DELIMITER $$ 
CREATE FUNCTION UCWords (
    string VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE buffer VARCHAR(255) DEFAULT '';
    DECLARE word   VARCHAR(255);
    DECLARE pos    TINYINT UNSIGNED;
    REPEAT
        -- pop word from beginning of string
        SET pos = LOCATE(' ', string);
        IF pos > 0 THEN
            SET word = SUBSTRING(string, 1, pos - 1);
            SET string = SUBSTRING(string, pos + 1);
        ELSE
            -- reached the last word
            SET word = string;
            SET string = '';
END IF; 
SET word = CONCAT(
            UPPER(SUBSTRING(word, 1, 1)),
            LOWER(SUBSTRING(word, 2)));
        SET buffer = CONCAT(buffer, ' ', word);
    UNTIL LENGTH(string) = 0
    END REPEAT;
    -- trim leading space
    RETURN SUBSTRING(buffer, 2);
END$$
DELIMITER ; 

