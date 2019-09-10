import {
  LitElement,
  html,
  property,
  customElement,
  queryAll
} from "lit-element";
import { render } from "lit-html";

import { distanceInWordsToNow } from "date-fns";
import { format } from "date-fns";

import { Task } from "../dto/task";

import "@vaadin/vaadin-grid";
import "@polymer/iron-icon";

@customElement("item-list")
class ItemList extends LitElement {
  @property({ type: Array })
  private tasks: Task[] = [];

  @queryAll("vaadin-grid-column")
  private gridColumns!: GridColumn[];

  render() {
    return html`
      <vaadin-grid id="taskgrid" .items=${this.tasks}>
        <vaadin-grid-column
          path="description"
          header="What did I do"
        ></vaadin-grid-column>
        <vaadin-grid-column header="When did I do it"></vaadin-grid-column>
        <vaadin-grid-column header="Mark as done"></vaadin-grid-column>
        <vaadin-grid-column header="Remove"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  firstUpdated() {
    this.gridColumns[1].renderer = (root, column, rowData) => {
      // Check if there is a container generated with the previous renderer call to update its content instead of recreation
      if (!root.firstElementChild) {
        const taskItem = rowData.item as Task;
        const taskDate = html`
          <div title=${this.formatDate(taskItem.date)}>
            ${this.humaniseDate(taskItem.date)}
          </div>
        `;
        render(taskDate, root);
      }
    };

    this.gridColumns[2].renderer = (root, column, rowData) => {
      // Check if there is a container generated with the previous renderer call to update its content instead of recreation
      if (!root.firstElementChild) {
        const doneButton = html`
          <vaadin-button aria-label="Mark as done" theme="primary icon success">
            <iron-icon icon="lumo:checkmark"></iron-icon>
          </vaadin-button>
        `;
        render(doneButton, root);
        if (root.firstElementChild != null) {
          const child: Element = root.firstElementChild;
          child.addEventListener("click", e => {
            const taskId: string | null = root.getAttribute("data-task-id");
            if (taskId) {
              const doneEvent = new CustomEvent("done", { detail: taskId });
              this.dispatchEvent(doneEvent);
            }
          });
        }
      }
      const taskItem = rowData.item as Task;
      root.setAttribute("data-task-id", taskItem.id);
    };

    this.gridColumns[3].renderer = (root, column, rowData) => {
      // Check if there is a container generated with the previous renderer call to update its content instead of recreation
      if (!root.firstElementChild) {
        const removeButton = html`
          <vaadin-button aria-label="Remove" theme="primary icon error">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        `;
        render(removeButton, root);
        if (root.firstElementChild != null) {
          const child: Element = root.firstElementChild;
          child.addEventListener("click", e => {
            const taskId: string | null = root.getAttribute("data-task-id");
            if (taskId) {
              const removeEvent = new CustomEvent("remove", { detail: taskId });
              this.dispatchEvent(removeEvent);
            }
          });
        }
      }

      const taskItem = rowData.item as Task;
      root.setAttribute("data-task-id", taskItem.id);
    };
  }

  private humaniseDate(date: string) {
    return distanceInWordsToNow(date, { addSuffix: true });
  }

  formatDate(date: string) {
    return format(date, "YYYY-MM-DD HH:mm");
  }
}
