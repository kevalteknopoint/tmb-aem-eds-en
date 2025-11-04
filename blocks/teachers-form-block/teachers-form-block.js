import { div, form } from "../../scripts/dom-helpers.js";
import dataMapMoObj from "./datamap.js";

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    "form-item",
    "form-sub-item",
    "form-inner-item",
  ];
  dataMapMoObj.addIndexed(block);

  const cssLink = block.querySelector(".form-item1 .form-inner-item1 a").getAttribute("href");
  const jsLink = block.querySelector(".form-item2 .form-inner-item1 a").getAttribute("href");
  const formId = block.querySelector(".form-item3 .form-inner-item1").innerText;
  const formApiKey = block.querySelector(".form-item4 .form-inner-item1").innerText;
  const formAction = block.querySelector(".form-item5 .form-inner-item1 a").getAttribute("href");
  const formBranchEnvt = block.querySelector(".form-item6 .form-inner-item1").innerText;
  const formChannel = block.querySelector(".form-item7 .form-inner-item1").innerText;
  const formConfig = block.querySelector(".form-item8 .form-inner-item1").innerText;

  const cfg = {
    css: cssLink,
    js: jsLink,
    id: formId,
    key: formApiK,
    action: formAction,
    envt: formBranchEnvt,
    channel:formChannel,
    config:formConfig
  };

  block.innerHTML = "";

  // Build form wrapper
  const formEl = form({
    method: "post",
    action: cfg.action,
    id: "WebForm",
    novalidate: true,
  });

  const wrapper = div({ class: "formatic" }, div({ id: "formcorp-form" }));
  formEl.appendChild(wrapper);
  block.appendChild(formEl);

  // Inject CSS into head
  if (cfg.css) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cfg.css;
    document.head.appendChild(link);
  }

  // Function to load external script and resolve when ready
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // Load JS and then init Formatic
  if (cfg.js) {
    loadScript(cfg.js)
      .then(() => {
        if (window.Formatic) {
          try {
            window.Formatic.createForm(
              "formcorp-form",
              cfg.id, // Enter Form ID
              cfg.key, // Enter Form Key
              cfg.envt, // Enter Form Environment
              cfg.channel,
              cfg.config
            );
          } catch (err) {
            //   console.error('Formatic init failed:', err);
          }
        } else {
          // console.error('Formatic library not available after loading script.');
        }
      })
      .catch((err) => {
        //   console.error('Failed to load Formatic script:', err);
        console.log(err);
      });
  }
}
