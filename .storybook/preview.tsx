import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: // { name: 'dark', value: '#000000' },
        { name: "light", value: "ffffff" }
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "light"
    }
  }
};

export default preview;
