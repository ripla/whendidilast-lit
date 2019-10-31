import { LitElement, html, customElement } from "lit-element";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings.js";

import "./main-view";

@customElement("main-app")
class MainApp extends LitElement {
  render() {
    return html`
      <main-view></main-view>
    `;
  }

  createRenderRoot() {
    // render without shadow DOM
    return this;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }
}
