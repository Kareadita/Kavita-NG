import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { KNG_TRANSLATION_OVERRIDES } from './translator';

export interface KngLocalizationFeature {
  providers: Provider[];
}

export function provideKngLocalization(
  ...features: KngLocalizationFeature[]
): EnvironmentProviders {
  return makeEnvironmentProviders(features.flatMap((feature) => feature.providers));
}

export function withOverrides(overrides: Record<string, string>): KngLocalizationFeature {
  return { providers: [{ provide: KNG_TRANSLATION_OVERRIDES, useValue: overrides }] };
}
