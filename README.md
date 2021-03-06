An online 2-player hangman utilizing raphael.js and comet.
==========================================================

The game is built on long polling as opposed to websockets due to contemporary
browsers' lack of support for websockets. The backend is built on python and
mongodb is used for persistance.

The current tech stack consists of:

* JQuery and Raphael.js
* Juggernaut for node.js (requires redis)
* Python with the Flask and pymongo modules
* MongoDB

I haven't bundled any dependencies as of now. What you need to get this running
is nginx compiled with the http push module. To avoid cross domain xhr, you
need to make your nginx server act as reverse proxy. This means that the same
host receives all the requests on the same port (regardsless of whether they'll
hang on the server or not). Nginx will dispatch the requests to the correct
endpoints based on configuration values. Nginx is very good at this and it is
almost trivial to configure.
