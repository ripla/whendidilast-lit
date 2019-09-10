import { LitElement, html, css, property, customElement } from "lit-element";

@customElement("title-view")
class TitleView extends LitElement {
  render() {
    return html`
      <h1>When Did I Last...</h1>
    `;
  }
}
