import { Box, styled } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "@/auth/useAuthContext";

// Custom styled component for ElevenLabs chat widget
const CustomElevenLabsBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "asPath",
})(({ theme, asPath,themeDirection }) => ({
  position: "fixed",
  bottom: {
    lg: "12rem", // Match SpeedDial positioning
    md: "12rem", // Match SpeedDial positioning
    sm: "8rem",  // Match SpeedDial positioning
    xs: "8rem",  // Match SpeedDial positioning
  },
  // Position on left side by default

  right: themeDirection == "ltr" ? "20px" : "auto",
  left: themeDirection == "ltr" ? "auto" : "-20px",
  zIndex: 999, // Same z-index as SpeedDial
  cursor: "pointer",
  padding: 0,
  bottom: "15px",


  [theme.breakpoints.down("md")]: {
    bottom: "3rem",
  },

  [theme.breakpoints.down("sm")]: {
    // bottom: "13rem",
    // On small screens, position on right side
    right: themeDirection == "ltr" ? "-20px" : "auto",
    left: themeDirection == "ltr" ? "auto" : "-20px",
   
  },

  // For customize page, adjust positioning
  ...(asPath && {
    right: themeDirection == "ltr" ? "auto" : "220px",
    left: themeDirection == "ltr" ? "220px" : "auto",
    bottom: "85px",
    [theme.breakpoints.down("sm")]: {
      right: "-20px!important",
      left: "auto!important",
      bottom: "120px",
      right: themeDirection == "ltr" ? "-20px" : "auto",
      left: themeDirection == "ltr" ? "auto" : "-20px",
    },
  }),

  "& elevenlabs-convai": {
    display: "block",
    width: "80px",
    height: "120px",
    overflow: "visible",
    position: "relative !important",
    bottom: "0 !important",
    right: "0 !important",
  }
}));

export default function ElevenLabsChat() {
  const router = useRouter();
  const { asPath } = router;
  const isCustomizePage = asPath.includes('/customize');
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  React.useEffect(() => {
    // Apply styles directly to the elevenlabs-convai element after it's loaded
    const applyStyles = () => {
      const elevenLabsElement = document.querySelector('elevenlabs-convai');
      if (elevenLabsElement) {
        // Apply inline styles to override the default positioning
        elevenLabsElement.style.position = 'relative';
        elevenLabsElement.style.bottom = '0';
        elevenLabsElement.style.right = '0';
        elevenLabsElement.style.width = '80px';
        elevenLabsElement.style.height = '120px';

        // Get the shadow root if available
        const shadowRoot = elevenLabsElement.shadowRoot;
        if (shadowRoot) {
          // Try to apply styles to elements inside the shadow DOM
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            :host {
              position: relative !important;
              bottom: 0 !important;
              right: 0 !important;
              width: 80px !important;
              height: 120px !important;
            }
            .chat-button {
              width: 80px !important;
              height: 120px !important;
              position: relative !important;
            }
            .chat-widget {
              bottom: 110px !important;
              left: ${window.innerWidth <= 600 ? '20px' : '0'} !important;
              right: ${window.innerWidth <= 600 ? '0' : 'auto'} !important;
              position: absolute !important;
            }
            .chat-label {
              font-size: 14px !important;
              font-weight: bold !important;
              display: block !important;
              text-align: center !important;
              margin-top: 5px !important;
              color: #333 !important;
              white-space: nowrap !important;
            }
          `;
          shadowRoot.appendChild(styleElement);
        }

        // Additional attempt to style the widget after it's fully loaded
        setTimeout(() => {
          const chatWidget = shadowRoot?.querySelector('.chat-widget');
          if (chatWidget) {
            chatWidget.style.bottom = '110px';
            // Adjust left/right based on screen size
            if (window.innerWidth <= 600) {
              //  chatWidget.style.right = '0';
              chatWidget.style.right = '20px';
            } else {
              chatWidget.style.left = '0';
              chatWidget.style.right = 'auto';
            }
            chatWidget.style.position = 'absolute';
          }

          const chatButton = shadowRoot?.querySelector('.chat-button');
          if (chatButton) {
            chatButton.style.width = '80px';
            chatButton.style.height = '80px';
            chatButton.style.position = 'relative';

            // Add a label for the chat button if it doesn't exist
            if (!shadowRoot.querySelector('.chat-label')) {
              const label = document.createElement('div');
              label.className = 'chat-label';
              label.textContent = 'AI Chat';
              label.style.fontSize = '14px';
              label.style.fontWeight = 'bold';
              label.style.display = 'block';
              label.style.textAlign = 'center';
              label.style.marginTop = '5px';
              label.style.color = '#333';
              label.style.whiteSpace = 'nowrap';

              // Insert the label after the chat button
              chatButton.parentNode.insertBefore(label, chatButton.nextSibling);
            }
          }
        }, 2000);
      }
    };

    // Initial styling
    setTimeout(applyStyles, 1000);

    // Apply styles again after a longer delay to ensure the widget is fully loaded
    setTimeout(applyStyles, 3000);

    // Add one more attempt after page is fully loaded
    setTimeout(applyStyles, 5000);

    // Add window resize listener to adjust positioning
    const handleResize = () => {
      applyStyles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // <></>
    <CustomElevenLabsBox
      asPath={isCustomizePage}
      className="elevenLabsChat left"
      themeDirection={themeDirection}
    >
      <elevenlabs-convai agent-id="agent_8601k1jz05prf959v2sfmk90nry1"></elevenlabs-convai>
    </CustomElevenLabsBox>
  );
}