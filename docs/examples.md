# Examples

## Tabbed form

You can create tabs around your forms automagically by using the following HTML.

```html
<div
  class="wplf-tabs tabbed-form-example"
  data-name="tabbedFormExample"
  data-default="second"
  data-remember
>
  <header>
    <button
      type="button"
      class="wplf-tabs__tabSwitcher"
      data-name="tabbedFormExample"
      data-target="first"
    >
      First
    </button>

    <button
      type="button"
      class="wplf-tabs__tabSwitcher"
      data-name="tabbedFormExample"
      data-target="second"
    >
      Second
    </button>
  </header>

  <section
    class="wplf-tabs__tab wplf"
    data-name="tabbedFormExample"
    data-tab="first"
  >
    <h3>First page</h3>

    <!-- whatever you want here -->
  </section>

  <section
    class="wplf-tabs__tab"
    data-name="tabbedFormExample"
    data-tab="second"
  >
    <h3>Second page</h3>

    <!-- whatever you want here -->
  </section>
</div>
```

`div.wplf-tabs`; the wrapper

- `data-name` is used for differentiating between other instances. Required.
- `data-default` is used to show the default tab. Required.
- `data-remember`, when used will remember the user's selection over reloads

`button.wplf-tabs__tabSwitcher`; the button used to switch tab

- `data-name` is used for differentiating between other instances. Required.
- `data-target` is used to select which tab to switch to. Required.

`section.wplf-tabs__tab`; the actual tabs

- `data-name` is used for differentiating between other instances. Required.
- `data-tab` Counterpart to data-target of the switch button. Required.

You can customize the HTML as you please, just be sure to have a wrapper with the class `wplf-tabs` and use the required attributes. If it doesn't work, see if there's an error in the JavaScript console.

## Multilingual form

Same as any other form, but be sure to utilize the `## PLL__ string ##` selector.

[Be sure to read this FAQ answer as well.](./FAQ.md#multilingual)

```html
<div class="wplf-formRow">
  <label for="name">
    <strong>## PLL__ PleaseEnterYourName ##</strong>
    <input type="text" name="name" id="name" placeholder="John Doe" />
  </label>

  <label for="email">
    <strong> ## PLL__ PleaseEnterYourEmail ## ## PLL__ required ## </strong>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="example@email.com"
      required
    />
  </label>
</div>

<div class="wplf-formRow">
  <label for="message">
    <strong>## PLL__ WriteYourMessageBelow ##</strong>
    <textarea
      name="message"
      rows="5"
      id="message"
      placeholder="I wanted to ask about..."
      required
    ></textarea>
  </label>
</div>

<div class="wplf-formRow">
  <button type="submit">## PLL__ Submit ##</button>
</div>
```

## Stress Test 9001

Test pretty much every functionality in WPLF in just one form.

```html
<div
  class="wplf-tabs tabbed-form-example"
  data-name="tabbedFormExample"
  data-default="first"
  data-remember
>
  <header>
    <button
      type="button"
      class="wplf-tabs__tabSwitcher"
      data-name="tabbedFormExample"
      data-target="first"
    >
      First
    </button>

    <button
      type="button"
      class="wplf-tabs__tabSwitcher"
      data-name="tabbedFormExample"
      data-target="second"
    >
      Second
    </button>
  </header>

  <section
    class="wplf-tabs__tab wplf"
    data-name="tabbedFormExample"
    data-tab="first"
  >
    <div class="wplf-formRow">
      <label for="name">
        <strong>## PLL__ PleaseEnterYourName ##</strong>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          name="Tester"
          required
        />
      </label>
    </div>

    <div class="wplf-formRow">
      <label for="email">
        <strong>## PLL__ PleaseEnterYourEmail ##</strong>
        <input type="email" name="email" id="email" value="test@email.com" />
      </label>
    </div>

    <div class="wplf-formRow">
      <label for="singleFile">
        <strong>## PLL__ UploadSomething ##</strong>
        <input type="file" name="singleFile" id="singleFile" />
      </label>
    </div>

    <div class="wplf-formRow">
      <label for="multiFile">
        <strong>## PLL__ UploadMultiple ##</strong>
        <input type="file" name="multiFile[]" multiple id="multiFile" />
      </label>
    </div>

    <div class="wplf-formRow">
      <strong>## PLL__ FillBoxes ##</strong>

      <label> <input type="checkbox" name="box[]" value="1" /> 1 </label>

      <label> <input type="checkbox" name="box[]" value="2" /> 2 </label>

      <label> <input type="checkbox" name="box[]" value="3" /> 3 </label>
    </div>

    <div class="wplf-formRow">
      <strong>## PLL__ FillRadio ##</strong>

      <label> <input type="radio" name="radio[]" value="1" /> 1 </label>

      <label> <input type="radio" name="radio[]" value="2" /> 2 </label>

      <label> <input type="radio" name="radio[]" value="3" /> 3 </label>
    </div>

    <div class="wplf-formRow">
      <button type="submit">Submit</button>
    </div>
  </section>

  <section
    class="wplf-tabs__tab"
    data-name="tabbedFormExample"
    data-tab="second"
  >
    More form fields:

    <div class="wplf-formRow">
      <strong>## PLL__ FillRadio ##</strong>

      <label> <input type="radio" name="radio2[]" value="1" /> 1 </label>

      <label> <input type="radio" name="radio2[]" value="2" /> 2 </label>

      <label> <input type="radio" name="radio2[]" value="3" /> 3 </label>
    </div>

    Go back to the previous tab to submit the form.
  </section>
</div>
```
