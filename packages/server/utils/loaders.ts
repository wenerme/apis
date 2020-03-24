export function loadScripts(src) {
  // todo quote ?
  if (document.querySelector(`script[src="${src}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = e => {
      script.remove();
      reject(e);
    };
    document.head.appendChild(script);
  });
}

export function loadStyles(href) {
  if (document.querySelector(`link[link="${href}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = (e) => {
      link.remove();
      reject(e);
    };
    document.head.appendChild(link);
  });
}
