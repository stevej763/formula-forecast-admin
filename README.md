README

Common build commands to use:

run server with local dev config: `npm run dev`

Build for various environments:
DEV: `npm build:dev`
DEMO: `npm build:demo`
PROD: `npm build:prod`

Docker containers:

`docker build --build-arg ENV=<ENVIRONMENT> -t formulaforecast-frontend .`
(provide the environment as a build arg, dev, demo or prod)

`docker run -p 8080:80 formulaforecast-frontend`


copy dist to html: 'sudo cp -r dist/* /var/www/html/'