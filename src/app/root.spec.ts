import 'ts-helpers';

import {
  it,
  fit,
  describe,
  fdescribe,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// to use Translate Service, we need Http, and to test Http we need to mock the backend
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {provide} from "@angular/core";

// Load the implementations that should be tested
import {App} from './index';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BaseRequestOptions,
    MockBackend,
    // Provide a mocked (fake) backend for Http
    provide(Http, {
      useFactory: function useFactory(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  describe('pipes', function() {});

  describe('services', function() {
    require('./services/api/spec');
  });

  describe('subcomponents', function() {
    require('./components/home/spec');
    require('./components/about/spec');
  })

});
