# Contributing

Please make sure your code conforms to the code style used in the rest of the plugin.

We use the standard WordPress code style, with a few major exceptions to make it nicer for modern GitHub projects:

* Indedation is 2 spaces, not tabs.
* Yoda conditions aren't enforced

## PHP Codesniffer

This project comes with a phpcs configuration (`phpcs.xml`) you can use to check your code like so:

Run phpcs in the project root directory:

```
phpcs --extensions=php --standard=./phpcs.xml -n -p .
```

Before you can run phpcs, you need to install PHP Codesniffer and WordPress coding standards like so:

```
composer create-project wp-coding-standards/wpcs:dev-master --no-dev $HOME/wpcs
```

Or read the official installation instructions here:

https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
