// export default async function decorate(block) {
//   const items = block.querySelectorAll('.quick-links > div > div');

//   items.forEach((item) => {
//     const heading = item.querySelector('p');
//     const ul = item.querySelector('ul');

//     if (!heading || !ul) return;

//     heading.addEventListener('click', () => {
//       const isActive = ul.classList.contains('active');
//       items.forEach((other) => {
//         const otherUl = other.querySelector('ul');
//         if (otherUl) otherUl.classList.remove('active');
//       });

//       if (!isActive) {
//         const allLists = block?.closest('.quick-links-container').querySelectorAll('ul');
//         allLists.forEach((listItem) => listItem.classList.remove('active'));
//         ul.classList.add('active');
//       }
//     });
//   });
// }
