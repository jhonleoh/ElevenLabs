import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "vite-plugin-bundle-obfuscator";

// https://vite.dev/config/
/**
 * Vite Configuration with JavaScript Obfuscator
 *
 * The configuration uses vite-plugin-bundle-obfuscator for code protection with a focus on:
 * 1. Optimal Performance: Settings that don't significantly impact runtime performance
 * 2. Strong Protection: Enough obfuscation to deter most reverse engineering attempts
 * 3. Compatibility: Ensures the code works across modern browsers
 *
 * Note: Obfuscation is only applied during production builds, not in development mode
 */
export default defineConfig({
	plugins: [
		react(),
		obfuscator({
			// Enable obfuscation in production mode only
			apply: "build",
			// Performance-optimized obfuscation configuration
			options: {
				compact: true,
				// Reduce control flow flattening to improve performance
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 0.5,
				// Reduce dead code injection for better performance
				deadCodeInjection: true,
				deadCodeInjectionThreshold: 0.2,
				// Disable debug protection for better performance
				debugProtection: false,
				debugProtectionInterval: 0,
				// Disable console output in production
				disableConsoleOutput: true,
				// Use mangled identifiers for better compression
				identifierNamesGenerator: 'mangled',
				log: false,
				// Rename globals can sometimes cause issues, keeping disabled
				renameGlobals: false,
				// String array optimizations for better performance
				rotateStringArray: true,
				selfDefending: true,
				shuffleStringArray: true,
				// Optimize string handling for better performance
				splitStrings: true,
				splitStringsChunkLength: 5,
				stringArray: true,
				// Use base64 encoding which has good performance
				stringArrayEncoding: ['base64'],
				stringArrayThreshold: 0.5,
				// Leave these disabled for better performance
				transformObjectKeys: false,
				unicodeEscapeSequence: false,
				// Additional performance optimizations
				reservedNames: [],
				reservedStrings: [],
				// Target specific browser versions for better performance
				target: 'browser',
				// Avoid obfuscating certain common names to prevent issues
				domainLock: [],
				exclude: [
					// Exclude node_modules to improve build performance
					'node_modules/**',
					// Add other patterns to exclude if needed
				]
			}
		})
	],
});
