# Contributing

Please make sure your code conforms to the code style used in the rest of the plugin.

We use the standard WordPress code style, with a few major exceptions to make it nicer for modern GitHub projects:

* Indedation is 2 spaces, not tabs.
* Yoda conditions aren't enforced

## PHP Codesniffer

This project comes with a phpcs configuration (`phpcs.xml`) you can use to check your code like so:

Run phpcs in the project root directory:

```
./vendor/bin/phpcs ./
```

You need to install the plugin's development dependencies before you can run the PHPCS checks. A regular

```
composer install
```

should install all the required packages.

You can read the official WPCS installation instructions here:

https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
