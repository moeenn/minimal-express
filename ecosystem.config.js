module.exports = {
  apps: [
    {
      name: "server",
      instances: "max", // can also provide fixed number
      max_memory_restart: "950M",
      exec_mode: "cluster",
      script: "./src/index.mjs"
    }
  ]
}