const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const supabase = createClient('https://SEU-PROJETO.supabase.co', 'SUA-CHAVE');

router.post('/salvar-historico', async (req, res) => {
  const { cliente_id, data, plano, observacoes } = req.body;
  await supabase.from('historico_alimentar').insert({ cliente_id, data, plano, observacoes });
  res.send({ status: 'ok' });
});

router.get('/historico/:cliente_id', async (req, res) => {
  const { cliente_id } = req.params;
  const { data, error } = await supabase
    .from('historico_alimentar')
    .select('*')
    .eq('cliente_id', cliente_id);
  res.send(data);
});

app.use('/api/', router);

module.exports = app;
module.exports.handler = serverless(app);
