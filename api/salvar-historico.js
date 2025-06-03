const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // 🪵 LOG importante: veja o que está chegando no corpo da requisição
  console.log("📥 Dados recebidos:", req.body);

  const { cliente_id, data, fase, plano, observacoes } = req.body;

  // Validação rápida opcional
  if (!cliente_id || !data || !fase || !plano) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const { error } = await supabase.from('historico_alimentar').insert([
    { cliente_id, data, fase, plano, observacoes },
  ]);

  if (error) {
    console.error("❌ Erro ao inserir no Supabase:", error);
    return res.status(500).json({ error });
  }

  console.log("✅ Dados inseridos com sucesso!");
  res.status(200).json({ status: 'ok' });
};
