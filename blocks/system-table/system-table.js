(function decorateLegalTcGuide() {
  if (window.location.origin.includes("author")) return;
  const block = document.querySelector(".system-table");

  if (!block) return;
  if (block) {
    const statusItems = document.querySelectorAll(".system-table li li");

    statusItems.forEach((item) => {
      const text = item.textContent.trim();
      if (text === "Service Available") {
        item.classList.add("status-available");
      } else if (text === "Service Unavailable") {
        item.classList.add("status-unavailable");
      } else if (text === "Service Interruptions") {
        item.classList.add("status-interruptions");
      }
    });
  }
}());
