export default function decorateIconLibrary(block) {
    function showToast(message, duration = 3000) {
        // Create container if it doesn't exist
        let container = document.getElementById("mui-toast-container");

        if (!container) {
            container = document.createElement("div");
            container.id = "mui-toast-container";
            Object.assign(container.style, {
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1400, // MUI snackbar z-index
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                pointerEvents: "none"
            });
            document.body.appendChild(container);
        }

        // Create toast
        const toast = document.createElement("div");
        toast.textContent = message;

        Object.assign(toast.style, {
            backgroundColor: "#323232",
            color: "#fff",
            padding: "6px 16px",
            minHeight: "48px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
            fontSize: "0.875rem",
            boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), " +
                "0px 5px 8px 0px rgba(0,0,0,0.14), " +
                "0px 1px 14px 0px rgba(0,0,0,0.12)",
            opacity: "0",
            transform: "translateY(20px)",
            transition: "opacity 200ms ease, transform 200ms ease",
            pointerEvents: "auto"
        });

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        });

        // Remove after duration
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";

            toast.addEventListener(
                "transitionend",
                () => toast.remove(),
                { once: true }
            );
        }, duration);
    }


    document.querySelectorAll('.icon-library svg').forEach((icon) => {
        icon.addEventListener('click', async function () {
            const span = icon.closest('span');
            const spanClassVal = span.classList.value?.replaceAll('icon-', '')?.replaceAll('icon', '');
            await navigator.clipboard.writeText(`:${spanClassVal}:`);
            showToast('Copied!');
        })
    })
}
