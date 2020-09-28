# Architecture

WP Libre Form is built with PHP, SQL and TypeScript. You don't have to use TypeScript to use WPLF.

## SQL

WPLF creates `n + 1` tables in your WordPress database, where `n` is the amount of forms you have. Those tables are named and structured as follows;

`{$prefix}wplf_{$form->ID}_submissions`

```
MariaDB [wordpress]> DESCRIBE wp_wplf_35_submissions;
+--------------+---------------------+------+-----+---------------------+-------------------------------+
| Field        | Type                | Null | Key | Default             | Extra
           |
+--------------+---------------------+------+-----+---------------------+-------------------------------+
| id           | bigint(20)          | NO   | PRI | NULL                | auto_increment
           |
| formId       | bigint(20) unsigned | YES  | MUL | NULL                |
           |
| historyId    | bigint(20)          | YES  | MUL | NULL                |
           |
| created      | datetime            | YES  |     | current_timestamp() |
           |
| modified     | datetime            | YES  |     | current_timestamp() | on update current_timestamp() |
| meta         | text                | YES  |     | NULL                |
           |
| referrerData | text                | YES  |     | NULL                |
           |
| usedFallback | tinyint(1)          | YES  |     | NULL                |
           |
| fieldname    | text                | YES  |     | NULL                |
           |
| fieldemail   | varchar(254)        | YES  |     | NULL                |
           |
| fieldmessage | longtext            | YES  |     | NULL                |
           |
+--------------+---------------------+------+-----+---------------------+-------------------------------+
11 rows in set (0.00 sec)

```

The table is updated as you go. When you add a new field, it gets a new column. Because of this, you can't reuse the same name on a different type of field without deleting the old column first.

**We _DO NOT DELETE_ the field columns from the submissions table without your _EXPLICIT_ confirmation to avoid losing data.**

In addition to those, we create a table called `{$prefix}wplf_history`, which is used to store earlier revisions of the form fields.

```
MariaDB [wordpress]> DESCRIBE wp_wplf_history;
+----------+---------------------+------+-----+---------------------+-------------------------------+
| Field    | Type                | Null | Key | Default             | Extra
       |
+----------+---------------------+------+-----+---------------------+-------------------------------+
| id       | bigint(20)          | NO   | PRI | NULL                | auto_increment
       |
| formId   | bigint(20) unsigned | NO   | MUL | NULL                |
       |
| fields   | longtext            | NO   |     | NULL                |
       |
| created  | datetime            | YES  |     | current_timestamp() |
       |
| modified | datetime            | YES  |     | current_timestamp() | on update current_timestamp() |
+----------+---------------------+------+-----+---------------------+-------------------------------+
5 rows in set (0.00 sec)
```

## PHP

Most PHP files reside under `classes/` and `lib/`, with one exception, `index.php`.

We use the namespace `WPLF`.

### `index.php`

Contains the plugin headers and creates the plugin initializer. Deactivation and activation hooks live here too.

### `classes/`

As you might expect, this folder contains the plugin classes. It's split into `entities/` and `modules/`.

#### `entities/`

Entities are used map data to object interfaces. They do not have access to the WPLF\Plugin instance. If absolutely necessary, they can get the instance by calling `libreform()` function, but that's `doing_it_wrong()` territory.

##### `class-form.php`

This is essentially our equivalent of WP_Post.

##### `class-submission.php`

See above.

#### `modules/`

Business logic of WPLF. This is where all of the magic happens.

##### `class-addons.php

`
Prints the admin page for WPLF addons, and provides the API for registering said addons.

##### `class-admin-interface.php`

Pretty much a wrapper class for all things admin.

##### `class-io.php`

The name should be self-explanatory, this class contains all\* of the plugins IO operations.

<sub><sup>\*: The entity classes and modules get & set wp_postmeta and do other non-performance intensive one-off operations, which wouldn't make sense as a class method.</sup></sub>

##### `class-notices.php`

We have all kinds of notices in multiple places, this class is used to register and render them. Most important feature; dismissible notices that don't come back.

##### `class-polylang.php`

The Polylang integration. Doesn't do anything if Polylang isn't activated. If it is, changes wp_localize_script and adds the `## PLL__ string ##` selector.

##### `class-rest-api.php`

Our API endpoints and handlers.

##### `class-selectors.php`

Magic behind the selectors. Selectors are static strings that are transpiled to whatever your heart desires at runtime.

#### `class-settings.php`

Prints our settings page and serves as our own Settings API.

### `lib/`

Everything that doesn't fit in a class, or is generic. Mostly helpers.

## TypeScript

I had no plans to use TypeScript when I wrote the initial draft of WPLF 2.0 JavaScript. Things came up and I was busy for 6 months, during which I had been converted. I just couldn't finish the code in JS.

So I ported it to TypeScript. In the process, I found & fixed 54 bugs / instances of undefined behaviour, so doing it was a great idea.

If you don't know TypeScript, that doesn't prevent you from using WPLF. Using it is entirely optional.

If you're using TypeScript and installed our npm package, our typings "should just work".

For now, the source lives in `assets/scripts`. The built source ends up in `dist/`.

The source is split up similarly to PHP, under `classes/` and `lib/` folders. In addition we have `types.ts`, `wplf-frontend.ts` and `wplf-admin.ts`.

### `types.ts`

Contains typings. Duh. You create the types here and import them where you need them.

### `wplf-frontend.ts`

Brings it all together. Imports the styles, initializes the WPLF class and exports it. Webpack builds it as an UMD module. In other words, it's exposed under window.WPLF if you load it with a `<script>` tag.

### `wplf-admin.ts`

See above. The main difference is that under window.WPLF is actually WPLF_Admin, which contains the WPLF instance in it.

### `classes/`

As the name implies, contains TypeScript classes.

#### `storage.ts`

LocalStorage wrapper. Used internally by WPLF_Tabs. Could be used to save form values locally in case user abandons form.

#### `wplf-addons.ts`

Nothing yet. Runs on the addon page.

#### `wplf-admin.ts`

Handles "routing" inside admin. Initializes other classes based on body classList.

#### `wplf-editor.ts`

The magic behind pretty much everything in the forms edit view. Initializes CodeMirror editors on the editable textareas, detects fields & conflicts between them etc. Spaghetti disguised as something else.

#### `wplf-form.ts`

Our frontend equivalent to WP_Post. Each WPLF_Form instance is responsible for one form element. Forms can have event based callbacks, and there's all kinds of goodies that you can use.

#### `wplf-settings.ts`

Nothing yet. Runs on the settings page.

#### `wplf-tabs.ts`

Tab "component" written in plain TypeScript. Doesn't depend on jQuery or React. Used internally in the admin interface, and externally in instances of WPLF_Form.

#### `wplf.ts`

Our frontend equivalent to WP_Post. Can be thought of a manager of WPLF_Form instances.

### `lib/`

#### `api-client.ts`

This should probably be a class, but it isn't. It works similarly to a class though. As the name implies, this is used for API requests.

Submissions, admin preview etc are all done through this. Requests can be aborted if necessary.

#### `ensure-num.ts`

Sometimes a number is a string when you need it as number. Essentially a parseInt/parseFloat wrapper.

#### `get-attribute.ts`

It can get a little annoying in TS at times. Helper for getting an attribute value from element.

#### `global-data.ts`

Glorified window.wplfData. Settings and metadata provided by wp_localize_script, but with types.

#### `is-elementish.ts`

Another one of those little annoying things in TS. Because it's possible to break things by passing a faulty event to an event listener, TS won't compile without a special type guard that tells it that X is indeed an Element.

#### `log.ts`

Logs things, verbosity depends on the debugLevel setting in globalData.

#### `wait.ts`

Because what's programming without arbitrary delays? Async wrappers for waiting. It's necessary to wait for the next "tick" after doing DOM operations before reading the DOM.
