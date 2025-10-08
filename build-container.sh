ENV=${1:-demo} # Default to 'demo' if not provided


echo "Building with ENV=$ENV"

docker build --build-arg ENV=${ENV} -t formulaforecast-frontend .