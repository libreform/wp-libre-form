# Contributing

Please make sure your code conforms to the code style used in the rest of the plugin.

We use PSR-12 with a few modifications:

* Indentation is 2 spaces, not 4.
* Braces are K&R. We're not savages.

This plugin used to use WordPress CS, but it caused all kind of weird formatting issues over the years. Code is not poetry. Using yoda conditions and adding extra whitespace everywhere is solving a problem that does not even exist. Some tips for readable code:

- Name your conditions by using variables especially if the condition is long: `if ($okToSendEmail) {`
- Keep lines short, max 120 characters. You know, line wrapping sucks.
- Avoid useless comments: `$variable = 'doge'; // assign a variable`

Install plugins dependencies & tooling by running `npm install` & `composer install` first.

## PHPCS

Run PHPCS with `composer run-script lint`. If it reports issues, use `composer run-script fix` to fix issues automatically.
