const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const supabase = createClient('https://eawncqhlpuemmedswdce.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd25jcWhscHVlbW1lZHN3ZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNzAzMzIsImV4cCI6MjA2Mzk0NjMzMn0.cZQQkol8enWMOMvlTsxlPmlxH-xzyTJK-bIRPMfRQi0'
)

app.post('/salvar-historico', async (req, res) => {
  const { cliente_id, data, fase, plano, observacoes } = req.body
  const { error } = await supabase.from('historico_alimentar').insert([{ cliente_id, data, fase, plano, observacoes }])
  if (error) return res.status(500).send(error)
  res.send({ status: 'ok' })
})

app.get('/historico/:cliente_id', async (req, res) => {
  const { cliente_id } = req.params
  const { data, error } = await supabase.from('historico_alimentar').select('*').eq('cliente_id', cliente_id)
  if (error) return res.status(500).send(error)
  res.send(data)
})

app.listen(3000, () => console.log('API rodando na porta 3000'))
