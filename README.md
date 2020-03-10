# WP Libre Form
[![Build Status](https://travis-ci.org/libreform/wp-libre-form.svg?branch=master)](https://travis-ci.org/libreform/wp-libre-form) [![Latest Stable Version](https://poser.pugx.org/libreform/wp-libre-form/v/stable)](https://packagist.org/packages/libreform/wp-libre-form) [![Total Downloads](https://poser.pugx.org/libreform/wp-libre-form/downloads)](https://packagist.org/packages/libreform/wp-libre-form) [![Latest Unstable Version](https://poser.pugx.org/libreform/wp-libre-form/v/unstable)](https://packagist.org/packages/libreform/wp-libre-form) [![License](https://poser.pugx.org/libreform/wp-libre-form/license)](https://packagist.org/packages/libreform/wp-libre-form)

Use standard HTML5 markup to create fully functional forms for WordPress. [Version 2.0 breaks backwards compatibility.](#new-in-2-0)

## Features

- Uses only HTML5 syntax to build forms. No GUIs, shortcodes, **no bullshit**.
- Works with any[*](docs/limitations.md) valid HTML form. Just copy any form from any website and it will work. **It's magic!**
- ~~Submissions are saved as custom post type posts. Form values are saved as custom fields.~~
- Validates required fields tagged with the native HTML5 `required` attribute.
- **It's hackable.** Add your own functionality with hooks and APIs.
- Email notifications of received form submissions
- Full file upload support to Media Library with input type=file
- Multilingual support with Polylang
- Predefined static HTML forms via filter hooks
- Dynamic values, like `## USER_EMAIL ##` for pre-populating form data
- Frontend JavaScript API. You can even install from npm.

## Why?

Modern HTML markup is already a great way to build forms. With Libre Form,
there's no need to learn clunky form builders that are hard to customise.

Just use standard HTML inputs to build, or copy a form to your WordPress site
that will just magically work. No need to touch PHP code if you don't want to.

Required field validation, email notifications, file uploads to WP gallery and
lots more are included by default in the core of the plugin, but you can also
add your own functionality with [hooks and APIs](#filter--action-api) provided
by Libre Form.

## Try it
[TryoutWP](https://gettryout.com/) has provided us with a live demo, [which you can find here](http://gettryout.com/new/?template=libreform&provider=demo&redirect=wp-admin%2Fpost.php%3Fpost%3D4%26action%3Dedit). It reflects the current release, not the master branch.

## Screenshots

### Editing a Form
![Form edit](/assets/screenshot-1.png)

### Form displayed in the default Twentysixteen theme
![Submissions](/assets/screenshot-2.png)

### Submissions view
![Submissions](/assets/screenshot-3.png)

### Single submission view
![Submissions](/assets/screenshot-4.png)

## Installation

### The Composer Way (preferred)

Install the plugin via [Composer](https://getcomposer.org/)
```
composer require libreform/wp-libre-form
```

Activate the plugin
```
wp plugin activate wp-libre-form
```

### The Old Fashioned Way

This plugin is available on the [official WordPress.org plugin directory](https://wordpress.org/plugins/libre-form/).

You can also install the plugin by directly uploading the zip file as instructed below:

1. [Download the plugin](https://github.com/libreform/wp-libre-form/archive/master.zip)
2. Upload to the plugin to /wp-content/plugins/ via the WordPress plugin uploader or your preferred method
3. Activate the plugin


## New in 2.0
The plugin has been rewritten from the ground up, breaking backwards compatibility. In other words; WPLF 1.5 is dead, long live WPLF 1.5!

Nothing in particular was wrong with 1.5, but it was getting a little annoying to maintain. The original version was written during ONE WordCamp, and we had added countless new features since that. You can still use the old version, but it will not receive updates anymore.

As migrations tend to be a pain in the ass, I made sure that the new version works side by side with the old one. Everything has been renamed so they do not conflict with each other.

Some key changes;

- Shortcode has been renamed to `libreform` from `libre-form`
- The form post type is now `libreform` (the old one was `wplf-form`)
- API has been camelCase'd
- Actions and hooks have been renamed
- Form submissions live in separate database tables now, each form gets a table.


## Actions, filters & API

- [Actions](docs/actions.md)
- [Filters](docs/filters.md)
- [API](docs/API.md)
- [FAQ](docs/FAQ.md)
- [Limitations](docs/limitations.md)

## Server requirements
 - PHP 7.3 or newer

## Browser support
The plugin may not work properly in outdated browsers, as it uses modern JavaScript features such as Fetch, Promise and async await. At the time of writing, all of these have been available natively in evergreen browsers such as Brave, Chrome and Firefox for quite some time now.

We used to provide polyfills for Fetch and Promise, but doing it yourself is a much better option. Test your forms on browsers that you expect your users to submit them with, and provide the necessary polyfills yourself. Our build process compiles the JS to target target browsers matching this browserslist query: [`>0.25%, not ie 11, not op_mini all`](https://jamie.build/last-2-versions)

In other words, our code is not bloated with stuff that 99% of the browsers have natively. You can use polyfill.io to provide support for older browsers if necessary. It's possible to get the plugin to work in a "browser" such as IE11, submit an issue if you need help with that.