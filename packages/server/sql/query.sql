WITH ranked_messages AS (
    SELECT m.*, ROW_NUMBER() OVER (
        PARTITION BY (
            case when from_user_id = 1 then to_user_id
                 else from_user_id
                end)
        ORDER BY id
        DESC) AS rn
    FROM wetalk.message AS m
    where from_user_id = 1 or to_user_id = 1
)
SELECT *
FROM ranked_messages where rn <= 5 ORDER BY id ASC
