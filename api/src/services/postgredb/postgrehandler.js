const { Pool } = require('pg');
const { postgresql } = require('./../../configs/settings.json');

let pool = new Pool(postgresql);
// Verifica se a conexão está ativa e tenta reconectá-la se não estiver
function checkConnection() {
    pool.query('SELECT 1', (err, result) => {
      if (err) {
        console.error('Erro ao verificar a conexão:', err);
        // Tenta reconectar em 5 segundos
        setTimeout(checkConnection, 5000);
      } else {
        console.log('Conexão ativa!');
      }
    });
  }
  
  // Chama a função para verificar a conexão
  checkConnection();