export default function loadAos() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = './aos.min.js';
    script.onload = () => resolve(window.AOS);
    script.onerror = () => reject(new Error('Failed to load AOS'));
    document.head.appendChild(script);
  });
}
