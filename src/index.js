/**
 * This is the main entrypoint file for the application.
 *
 * When loaded in the client side, the application is rendered in the
 * #root element.
 *
 * When the bundle created from this file is imported in the server
 * side, the exported `renderApp` function can be used for server side
 * rendering.
 *
 * Note that this file is required for the build process.
 */

// React 16 depends on the collection types Map and Set, as well as requestAnimationFrame.
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/features/map';
import 'core-js/features/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { loadableReady } from '@loadable/component';
import { createInstance, types as sdkTypes } from './util/sdkLoader';
import { ClientApp, renderApp } from './app';
import configureStore from './store';
import { matchPathname } from './util/routes';
import * as sample from './util/sample';
import * as apiUtils from './util/api';
import config from './config';
import { authInfo } from './ducks/Auth.duck';
import { fetchAppAssets } from './ducks/hostedAssets.duck';
import { fetchCurrentUser } from './ducks/user.duck';
import routeConfiguration from './routeConfiguration';
import * as log from './util/log';
import { LoggingAnalyticsHandler, GoogleAnalyticsHandler } from './analytics/handlers';

import './styles/marketplaceDefaults.css';

const render = (store, shouldHydrate) => {
  // If the server already loaded the auth information, render the app
  // immediately. Otherwise wait for the flag to be loaded and render
  // when auth information is present.
  const state = store.getState();
  const cdnAssetsVersion = state.hostedAssets.version;
  const authInfoLoaded = state.Auth.authInfoLoaded;
  const info = authInfoLoaded ? Promise.resolve({}) : store.dispatch(authInfo());
  info
    .then(() => {
      store.dispatch(fetchCurrentUser());
      // Ensure that Loadable Components is ready
      // and fetch hosted assets in parallel before initializing the ClientApp
      return Promise.all([
        loadableReady(),
        store.dispatch(fetchAppAssets(config.appCdnAssets, cdnAssetsVersion)),
      ]);
    })
    .then(([_, fetchedAssets]) => {
      const translations = fetchedAssets?.translations?.data || {};
      if (shouldHydrate) {
        ReactDOM.hydrate(
          <ClientApp store={store} hostedTranslations={translations} />,
          document.getElementById('root')
        );
      } else {
        ReactDOM.render(
          <ClientApp store={store} hostedTranslations={translations} />,
          document.getElementById('root')
        );
      }
    })
    .catch(e => {
      log.error(e, 'browser-side-render-failed');
    });
};

const setupAnalyticsHandlers = () => {
  let handlers = [];

  // Log analytics page views and events in dev mode
  if (config.dev) {
    handlers.push(new LoggingAnalyticsHandler());
  }

  // Add Google Analytics 4 (GA4) handler if tracker ID is found
  if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
    if (window?.gtag) {
      handlers.push(new GoogleAnalyticsHandler(window.gtag));
    } else {
      // Some adblockers (e.g. Ghostery) might block the Google Analytics integration.
      console.warn(
        'Google Analytics (window.gtag) is not available. It might be that your adblocker is blocking it.'
      );
    }
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID.indexOf('G-') !== 0) {
      console.warn(
        'Google Analytics 4 (GA4) should have measurement id that starts with "G-" prefix'
      );
    }
  }

  return handlers;
};

// If we're in a browser already, render the client application.
if (typeof window !== 'undefined') {
  // set up logger with Sentry DSN client key and environment
  log.setup();

  const baseUrl = config.sdk.baseUrl ? { baseUrl: config.sdk.baseUrl } : {};
  const assetCdnBaseUrl = config.sdk.assetCdnBaseUrl
    ? { assetCdnBaseUrl: config.sdk.assetCdnBaseUrl }
    : {};

  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || '{}';
  const initialState = JSON.parse(preloadedState, sdkTypes.reviver);
  const sdk = createInstance({
    transitVerbose: config.sdk.transitVerbose,
    clientId: config.sdk.clientId,
    secure: config.usingSSL,
    typeHandlers: apiUtils.typeHandlers,
    ...baseUrl,
    ...assetCdnBaseUrl,
  });
  const analyticsHandlers = setupAnalyticsHandlers();
  const store = configureStore(initialState, sdk, analyticsHandlers);

  require('./util/polyfills');
  render(store, !!window.__PRELOADED_STATE__);

  if (config.dev) {
    // Expose stuff for the browser REPL
    window.app = {
      config,
      sdk,
      sdkTypes,
      store,
      sample,
      routeConfiguration: routeConfiguration(),
    };
  }
}

// Show warning if CSP is not enabled
const CSP = process.env.REACT_APP_CSP;
const cspEnabled = CSP === 'block' || CSP === 'report';

if (CSP === 'report' && process.env.REACT_APP_ENV === 'production') {
  console.warn(
    'Your production environment should use CSP with "block" mode. Read more from: https://www.sharetribe.com/docs/ftw-security/how-to-set-up-csp-for-ftw/'
  );
} else if (!cspEnabled) {
  console.warn(
    "CSP is currently not enabled! You should add an environment variable REACT_APP_CSP with the value 'report' or 'block'. Read more from: https://www.sharetribe.com/docs/ftw-security/how-to-set-up-csp-for-ftw/"
  );
}

// array shuffle method implementation
Array.prototype.shuffle = function shuffle() {
  let currentIndex = this.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex], this[currentIndex]];
  }

  return this;
}

// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore, routeConfiguration, config, fetchAppAssets };
