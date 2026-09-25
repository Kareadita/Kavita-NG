import { createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideKavitaNg } from './provide-kavita-ng';

describe('provideKavitaNg', () => {
  it('creates an environment injector', () => {
    const injector = createEnvironmentInjector([provideKavitaNg()], TestBed.inject(EnvironmentInjector));

    expect(injector).toBeInstanceOf(EnvironmentInjector);
    injector.destroy();
  });
});
