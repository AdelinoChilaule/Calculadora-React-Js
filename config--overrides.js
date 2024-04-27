const path = require("path");

module.exports = function override(config, env) {
  // Altere o caminho público para funcionar com uma rota personalizada
  config.output.publicPath = "./";

  // Adicione a configuração do service worker
  config.plugins.push({
    apply: (compiler) => {
      const swOptions = {
        // Altere o nome do arquivo se necessário
        filename: "service-worker.js",
        // Altere esta opção se você tiver outros diretórios públicos
        publicPath: "./",
        // Coloque aqui as rotas que você deseja excluir do cache
        exclude: [/\.map$/, /asset-manifest\.json$/],
        // Configuração opcional: personalize o nome do cache
        cacheName: "my-cache",
      };

      const { GenerateSW } = require("workbox-webpack-plugin");
      compiler.options.plugins.push(new GenerateSW(swOptions));
    },
  });

  // Altere o diretório de saída para que o service worker possa encontrar os arquivos
  config.output.path = path.resolve(__dirname, "build");

  return config;
};
