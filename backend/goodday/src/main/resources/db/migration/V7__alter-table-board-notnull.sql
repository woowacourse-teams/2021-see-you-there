﻿UPDATE board SET content = 'null' WHERE content IS NULL;
UPDATE board SET title = 'null' WHERE title IS NULL;

ALTER TABLE board MODIFY content text NOT NULL;
ALTER TABLE board MODIFY title varchar(255) NOT NULL;
