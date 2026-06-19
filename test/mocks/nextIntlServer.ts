// Stand-in for next-intl/server in tests. The real implementation reads from
// an AsyncLocalStorage request context that only exists inside Next's server
// runtime, so calling it directly in Vitest throws. This fake reproduces the
// handful of behaviors the app actually relies on, backed by the real
// message catalogs so tests still exercise real translation keys.
import en from '../../src/messages/en.json';
import vi from '../../src/messages/vi.json';
import ja from '../../src/messages/ja.json';

type Messages = Record<string, unknown>;

const catalogs: Record<string, Messages> = { en, vi, ja };

let ambientLocale = 'en';

function getNested(obj: unknown, keyPath: string): unknown {
  return keyPath.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function makeT(scope: unknown) {
  const t = (key: string, values?: Record<string, string | number>) => {
    let value = getNested(scope, key);
    if (value == null) return key;
    if (typeof value !== 'string') return value;
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        value = (value as string).replaceAll(`{${k}}`, String(v));
      }
    }
    return value;
  };
  t.raw = (key: string) => getNested(scope, key);
  t.rich = (key: string) => getNested(scope, key) ?? key;
  return t;
}

export async function getTranslations(
  arg?: string | { locale?: string; namespace?: string }
) {
  let locale = ambientLocale;
  let namespace: string | undefined;

  if (typeof arg === 'string') {
    namespace = arg;
  } else if (arg) {
    locale = arg.locale ?? ambientLocale;
    namespace = arg.namespace;
  }

  const messages = catalogs[locale] ?? catalogs.en;
  const scope = namespace ? getNested(messages, namespace) : messages;
  return makeT(scope ?? {});
}

export async function getMessages(arg?: { locale?: string }) {
  const locale = arg?.locale ?? ambientLocale;
  return catalogs[locale] ?? catalogs.en;
}

export async function getLocale() {
  return ambientLocale;
}

export function setRequestLocale(locale: string) {
  ambientLocale = locale;
}

export function __resetAmbientLocale() {
  ambientLocale = 'en';
}
