import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const hmrSuppressPlugin = {
  name: 'suppress-hmr-errors',
  transformIndexHtml: {
    order: 'post' as const,
    handler(html: string) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `(function() {
  var OrigWS = window.WebSocket;
  if (OrigWS) {
    function MockHmrSocket(url, protocols) {
      this.url = url;
      this.protocols = protocols;
      this.readyState = 1;
      this.OPEN = 1;
      this.CLOSED = 3;
      this.CLOSING = 2;
      this.CONNECTING = 0;
      this._listeners = {};
      var self = this;
      setTimeout(function() {
        if (typeof self.onopen === 'function') self.onopen({ type: 'open' });
        self.dispatchEvent(new Event('open'));
      }, 0);
    }
    MockHmrSocket.OPEN = 1;
    MockHmrSocket.CLOSED = 3;
    MockHmrSocket.CLOSING = 2;
    MockHmrSocket.CONNECTING = 0;
    MockHmrSocket.prototype = {
      addEventListener: function(type, fn) {
        if (!this._listeners[type]) this._listeners[type] = [];
        this._listeners[type].push(fn);
        if (type === 'open') {
          setTimeout(function() { fn({ type: 'open' }); }, 0);
        }
      },
      removeEventListener: function(type, fn) {
        if (this._listeners[type]) {
          this._listeners[type] = this._listeners[type].filter(function(f) { return f !== fn; });
        }
      },
      dispatchEvent: function(event) {
        var fns = this._listeners[event.type] || [];
        fns.forEach(function(fn) { fn(event); });
        return true;
      },
      send: function() {},
      close: function() {
        this.readyState = 3;
        var self = this;
        setTimeout(function() {
          if (typeof self.onclose === 'function') self.onclose({ type: 'close', wasClean: true });
          self.dispatchEvent(new Event('close'));
        }, 0);
      }
    };

    window.WebSocket = function(url, protocols) {
      var isViteHmr = protocols === 'vite-hmr' || (Array.isArray(protocols) && protocols.indexOf('vite-hmr') !== -1) || protocols === 'vite-ping';
      if (isViteHmr) {
        return new MockHmrSocket(url, protocols);
      }
      return new OrigWS(url, protocols);
    };
    for (var k in OrigWS) {
      if (Object.prototype.hasOwnProperty.call(OrigWS, k)) {
        window.WebSocket[k] = OrigWS[k];
      }
    }
    window.WebSocket.prototype = OrigWS.prototype;
  }

  window.addEventListener('unhandledrejection', function(event) {
    if (event && event.reason && (
      (typeof event.reason.message === 'string' && event.reason.message.indexOf('WebSocket') !== -1) ||
      (typeof event.reason === 'string' && event.reason.indexOf('WebSocket') !== -1)
    )) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('error', function(event) {
    if (event && event.message && event.message.indexOf('WebSocket') !== -1) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();`,
            injectTo: 'head-prepend' as const,
          },
        ],
      };
    },
  },
};

export default defineConfig(() => {
  return {
    plugins: [
      hmrSuppressPlugin,
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'YonyWood — Réseau documentaire vivant',
          short_name: 'YonyWood',
          description: 'Des histoires qui nous relient. Deux univers, une même question, une même forêt.',
          theme_color: '#A2482B',
          background_color: '#FFFFFF',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: false,
      watch: null,
    },
  };
});
