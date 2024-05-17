export function external_link() {
  document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      if (link.hostname !== window.location.hostname) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  });
}
