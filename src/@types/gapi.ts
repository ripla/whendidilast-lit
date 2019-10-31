declare namespace gapi {
  type LoadCallback = (...args: any[]) => void;

  interface GoogleAuth {
    isSignedId(): boolean;
  }

  export function load(apiName: string, callback: LoadCallback): void;

  // https://developers.google.com/identity/sign-in/web/reference
  namespace auth2 {
    // https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
    type ClientConfig = {
      client_id?: string;
      scope?: string;
      fetch_basic_profile?: boolean;
    };

    export function init(config: ClientConfig): GoogleAuth;
  }

  namespace signin2 {
    interface SignInRenderOptions {
      width?: number;
      height?: number;
      longtitle?: boolean;
      theme?: "light" | "dark";
    }

    export function render(
      id: string | HTMLElement,
      options?: SignInRenderOptions
    ): void;
  }
}
