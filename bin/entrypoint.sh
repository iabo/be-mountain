set -x
pid=0
term_handler() {
    if [ $pid -ne 0 ]; then
    kill -SIGTERM "$pid"
    wait "$pid"
    fi
    exit 143; # 128 + 15 -- SIGTERM
}
>&2 echo "Checking if MySQL is available..."

until echo '\q' | mysql -h"$MYSQL_HOST" -P"3306" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" $MYSQL_DATABASE; do
    >&2 echo "MySQL is unavailable - sleeping"
    sleep 3
done

>&2 echo "MySQL and Data are up - executing command"

>&2 echo "Creating Auth Keys..."
./bin/generate_keys.sh

>&2 echo "Running DB migrations..."
npx knex migrate:latest

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region $AWS_DEFAULT_REGION

>&2 echo "Running tests"
# Setup background process
trap 'kill ${!}; term_handler' SIGTERM
# Run app 
node $1 &
# Save pid
pid=$!
echo "Pid: $pid"
# Loop!
while true
do
    tail -f /dev/null & wait ${!}
done