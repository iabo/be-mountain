>&2 echo "Checking if MySQL is available..."

until echo '\q' | mysql -h"$MYSQL_HOST" -P"3306" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" $MYSQL_DATABASE; do
    >&2 echo "MySQL is unavailable - sleeping"
    sleep 3
done

>&2 echo "MySQL and Data are up - executing command"

>&2 echo "Creation migrations..."
npx knex migrate:latest

>&2 echo "Running tests"
npm run test

>&2 echo "Rolling back all migrations..."
npx knex migrate:rollback --all