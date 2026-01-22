import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // { name: 'dark', value: '#000000' },
        { name: "light", value: "ffffff" },
      ],
      default: "light",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
