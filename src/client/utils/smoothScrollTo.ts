export default function smoothScrollTo(elementId: string) {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.history.replaceState(null, '', elementId);
  }
}
