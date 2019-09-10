declare module "@vaadin/vaadin-notification/vaadin-notification";

declare class NotificationElement extends HTMLElement {
  open(): void;

  renderer(root: HTMLElement): void;

  duration: number;
}
