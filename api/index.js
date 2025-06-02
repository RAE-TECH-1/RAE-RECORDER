const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post('/salvar-historico', async (req, res) => {
  const { cliente_id, data, fase, plano, observacoes } = req.body;
  const { error } = await supabase
    .from('historico_alimentar')
    .insert([{ cliente_id, data, fase, plano, observacoes }]);
  if (error) return res.status(500).send(error);
  res.send({ status: 'ok' });
});

app.get('/historico/:cliente_id', async (req, res) => {
  const { cliente_id } = req.params;
  const { data, error } = await supabase
    .from('historico_alimentar')
    .select('*')
    .eq('cliente_id', cliente_id);
  if (error) return res.status(500).send(error);
  res.send(data);
});

app.get('/', (req, res) => {
  res.send('🚀 API RAE RECORDER ONLINE');
});


// Exportação para uso pela Vercel
module.exports = app;
module.exports.handler = serverless(app);
