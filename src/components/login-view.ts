import { css, customElement, LitElement, html, property } from "lit-element";
import { store, RootState } from "../store";
import { setUser } from "../actions/user";

import { connect } from "pwa-helpers/connect-mixin.js";

import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

import { userEmailSelector, userNameSelector } from "../reducers/user";

import "@vaadin/vaadin-button";

interface ExpectedUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

@customElement("login-view")
class LoginView extends connect(store)(LitElement) {
  @property({ type: Boolean })
  private isUserLoggedIn = false;

  @property({ type: String })
  private userName = "";

  @property({ type: String })
  private userEmail = "";

  private auth0: Auth0Client | null = null;

  static get styles() {
    return css`
      #authBar {
        display: flex;
        justify-content: flex-end;
      }
    `;
  }

  render() {
    return html`
      <div id="authBar" ?hidden=${this.auth0 == null}>
        <vaadin-button
          ?hidden=${this.isUserLoggedIn}
          aria-label="Login"
          theme="primary"
          @click=${this.login}
        >
          <iron-icon icon="lumo:user" slot="prefix"></iron-icon>
          Login
        </vaadin-button>

        <vaadin-button
          ?hidden=${!this.isUserLoggedIn}
          aria-label="Logout"
          theme="primary"
          @click=${this.logout}
        >
          <iron-icon icon="lumo:user" slot="prefix"></iron-icon>
          Logout
        </vaadin-button>
        ${this.isUserLoggedIn
          ? html`
              <h3>Logged in as ${this.userName} (${this.userEmail})</h3>
            `
          : ""}
      </div>
    `;
  }

  firstUpdated() {
    this.configureAuth();
  }

  stateChanged(state: RootState) {
    this.userName = userNameSelector(state);
    this.userEmail = userEmailSelector(state);
  }

  private async configureAuth() {
    const authClient = await this.configureAuthClient();

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      await authClient.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    this.setLoggedInStatus(authClient);
  }

  private async configureAuthClient(): Promise<Auth0Client> {
    const authConfigResponse = await this.fetchAuthConfig();
    const authConfig = await authConfigResponse.json();
    this.auth0 = await createAuth0Client({
      domain: authConfig.domain,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: authConfig.clientId
    });
    return this.auth0;
  }

  private async setLoggedInStatus(authClient: Auth0Client) {
    this.isUserLoggedIn = await authClient.isAuthenticated();
    const user: ExpectedUser = await authClient.getUser();
    setUser(user.name, user.email, user.picture);
  }

  private async fetchAuthConfig() {
    return fetch("/auth_config.json");
  }

  private async login() {
    if (this.auth0 != null) {
      await this.auth0.loginWithRedirect({
        redirect_uri: window.location.origin
      });
    }
  }

  private logout() {
    if (this.auth0 != null) {
      this.auth0.logout({
        returnTo: window.location.origin
      });
    }
  }

  private getShadowRoot(): ShadowRoot {
    if (this.shadowRoot) {
      return this.shadowRoot;
    } else {
      throw new Error("No shadowroot found");
    }
  }
}
