import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "vite-plugin-bundle-obfuscator";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		obfuscator({
			// Enable obfuscation in production mode only
			apply: "build",
			// Basic obfuscation configuration
			options: {
				compact: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 0.75,
				deadCodeInjection: true,
				deadCodeInjectionThreshold: 0.4,
				debugProtection: false,
				debugProtectionInterval: 0,
				disableConsoleOutput: true,
				identifierNamesGenerator: 'hexadecimal',
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: true,
				shuffleStringArray: true,
				splitStrings: true,
				splitStringsChunkLength: 10,
				stringArray: true,
				stringArrayEncoding: ['base64'],
				stringArrayThreshold: 0.75,
				transformObjectKeys: false,
				unicodeEscapeSequence: false
			}
		})
	],
});
