// vite.config.ts
import react from "file:///C:/Users/SNiQA/Desktop/assets/react-assets/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/SNiQA/Desktop/assets/react-assets/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\SNiQA\\Desktop\\assets\\react-assets";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@comps": resolve(__vite_injected_original_dirname, "./src/components"),
      "@assets": resolve(__vite_injected_original_dirname, "./src/assets"),
      "@icons": resolve(__vite_injected_original_dirname, "./src/assets/icons"),
      "@store": resolve(__vite_injected_original_dirname, "./src/store"),
      "@views": resolve(__vite_injected_original_dirname, "./src/views"),
      "@path": resolve(__vite_injected_original_dirname, "./src/path_map.ts"),
      "@hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@apis": resolve(__vite_injected_original_dirname, "./src/apis"),
      "@types": resolve(__vite_injected_original_dirname, "./src/types")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTTmlRQVxcXFxEZXNrdG9wXFxcXGFzc2V0c1xcXFxyZWFjdC1hc3NldHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFNOaVFBXFxcXERlc2t0b3BcXFxcYXNzZXRzXFxcXHJlYWN0LWFzc2V0c1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU05pUUEvRGVza3RvcC9hc3NldHMvcmVhY3QtYXNzZXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAnQGNvbXBzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICdAYXNzZXRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSxcclxuICAgICAgJ0BpY29ucyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzL2ljb25zJyksXHJcbiAgICAgICdAc3RvcmUnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJyksXHJcbiAgICAgICdAdmlld3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3ZpZXdzJyksXHJcbiAgICAgICdAcGF0aCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGF0aF9tYXAudHMnKSxcclxuICAgICAgJ0Bob29rcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcclxuICAgICAgJ0BhcGlzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hcGlzJyksXHJcbiAgICAgICdAdHlwZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3R5cGVzJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsT0FBTyxXQUFXO0FBQzlVLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUY3QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUMvQixVQUFVLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDL0MsV0FBVyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM1QyxVQUFVLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsTUFDakQsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMxQyxVQUFVLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzFDLFNBQVMsUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxNQUMvQyxVQUFVLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzFDLFNBQVMsUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDeEMsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxJQUM1QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
