import { LitElement, html, css, property, customElement } from 'lit-element';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@polymer/iron-icon'

@customElement('new-item-form')
class NewItemForm extends LitElement {

    @property({type: String})
    private newValue: string = "";

    styles() {
        return [
            css`
                :host {
                    margin: var(--lumo-space-wide-m);
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                span {
                    margin-right: 0.5em;
                }
            `
        ];
    }

    render() {
        return html`
            <span>Thing I did:</span>
            
            <vaadin-text-field
                id="itemDescription"
                placeholder="description"
                .value=${this.newValue}
                @input=${this.handleChange}
                @keydown=${this.handleKeyDown}>
            </vaadin-text-field>
            
            <vaadin-button
                aria-label="Create new"
                @click=${this.handleSubmit}
                theme="primary icon">
                <iron-icon icon="lumo:plus"></iron-icon>
            </vaadin-button>
        `;
    }

    private handleChange(e: any) {
        this.newValue = e.target.value;
    }

    private handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            this.handleSubmit();
          }
    }

    private handleSubmit() {
        const valueChangeEvent = new CustomEvent('newthing', { detail: this.newValue });
        this.dispatchEvent(valueChangeEvent);
        this.newValue = '';
    }
}