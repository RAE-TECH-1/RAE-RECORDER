const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { cliente_id, data, fase, plano, observacoes } = req.body;
  const { error } = await supabase.from('historico_alimentar').insert([
    { cliente_id, data, fase, plano, observacoes },
  ]);

  if (error) return res.status(500).json({ error });
  res.status(200).json({ status: 'ok' });
};
