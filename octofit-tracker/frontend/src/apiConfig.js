const isCodespaceHost = typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev');
const codespaceHost = isCodespaceHost
  ? window.location.hostname.replace('-3000.app.github.dev', '-8000.app.github.dev')
  : null;

const host = process.env.REACT_APP_CODESPACE_NAME
  ? `${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : codespaceHost || 'localhost:8000';

const protocol = isCodespaceHost ? 'https' : 'http';

export const API_BASE_URL = `${protocol}://${host}/api`;

export function endpointFor(resource) {
  return `${API_BASE_URL}/${resource}/`;
}
