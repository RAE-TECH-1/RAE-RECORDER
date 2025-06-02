const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  const cliente_id = req.query.cliente_id;

  const { data, error } = await supabase
    .from('historico_alimentar')
    .select('*')
    .eq('cliente_id', cliente_id);

  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
};
