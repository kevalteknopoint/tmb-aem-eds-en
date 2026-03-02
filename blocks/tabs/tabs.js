export default async function decorate(block) {
  if (window.location.origin.includes('author')) return;
  console.log(block);
}
