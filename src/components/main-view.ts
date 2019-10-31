import {
  LitElement,
  html,
  css,
  property,
  customElement,
  TemplateResult
} from "lit-element";
import { render } from "lit-html";
import { until } from "lit-html/directives/until";
import { guard } from "lit-html/directives/guard";

import { connect } from "pwa-helpers/connect-mixin.js";

import "@vaadin/vaadin-notification/vaadin-notification";

import { store, RootState } from "../store";
import { addTask, taskDone, removeTask } from "../actions/task";
import { Task } from "../dto/task";

import "./title-view";
import "./new-item-form";
import "./item-list";
import { sortedTasksSelector } from "../reducers/task";

@customElement("main-view")
class MainView extends connect(store)(LitElement) {
  @property({ type: Array })
  private tasks: Task[] = [];

  @property({ type: Boolean })
  private isOffline = false;

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        #headerBar {
          display: flex;
          align-items: center;
          padding-right: 1em;
        }

        title-view {
          flex-grow: 1;
        }
      `
    ];
  }

  render() {
    return html`
      <div id="headerBar">
        <title-view></title-view>
        ${guard(this.isOffline, () => until(this.createLoginView()))}
      </div>
      <new-item-form @newthing=${this.handleNewThing}></new-item-form>
      <item-list
        .tasks=${this.tasks}
        @done=${this.handleDone}
        @remove=${this.handleRemove}
      >
      </item-list>
    `;
  }

  stateChanged(state: RootState) {
    this.tasks = sortedTasksSelector(state);
  }

  private async createLoginView() {
    await import("./login-view");
    return html`
      <login-view></login-view>
    `;
  }

  private handleNewThing(e: CustomEvent) {
    const newThingDescription = e.detail;

    if (!newThingDescription || newThingDescription === "") {
      return;
    }

    store.dispatch(addTask(newThingDescription));
    this.showMessage(
      html`
        <span>Added item <i>${newThingDescription}</i></span>
      `
    );
  }

  private handleDone(e: CustomEvent) {
    store.dispatch(taskDone(e.detail));
  }

  private handleRemove(e: CustomEvent) {
    store.dispatch(removeTask(e.detail));
  }

  private showMessage(content: TemplateResult): void {
    const notification: NotificationElement = document.createElement(
      "vaadin-notification"
    ) as NotificationElement;
    notification.duration = 4000;
    notification.renderer = (root: HTMLElement) => {
      render(content, root);
    };
    notification.addEventListener("opened-changed", () => {
      if (notification.parentElement) {
        document.body.removeChild(notification);
      }
    });
    document.body.appendChild(notification);

    notification.open();
  }
}
