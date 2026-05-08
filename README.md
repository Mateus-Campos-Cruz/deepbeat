🎧 Deep Beat

Plataforma de gerenciamento de beats e produção musical.

⚡ Início Rápido
bash# Clone o repositório
git clone https://github.com/seu-usuario/deep-beat.git
cd deep-beat

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
Acesse: http://localhost:3000

🔐 Credenciais de Teste
CampoValorE-mailadmin@deepbeat.comSenhapassword123

Os dados são populados automaticamente no primeiro acesso (beats, vendas, clientes e posts de demonstração).


🗂️ Páginas
RotaDescrição/loginAutenticação/dashboardVisão geral, métricas e gráficos/beatsCatálogo de beats (CRUD)/beats/:idDetalhes do beat/financeiroVendas, receita e licenças emitidas/clientesBase de compradores (CRUD)/licencasTipos de licença (CRUD)/colaboracoesParcerias e divisão de receita (CRUD)/redes-sociaisAgendamento de posts (CRUD)/configuracoesPerfil, preferências e dados

🛠️ Stack

React + React Router v6
Recharts — gráficos
Lucide React — ícones
LocalStorage — persistência (sem backend)


💾 Dados
Todos os dados ficam no localStorage sob a chave deepbeat_v1. Para resetar:
jslocalStorage.removeItem('deepbeat_v1')
Ou via Configurações → Gerenciar Dados → Limpar todos os dados.

📁 Estrutura
src/
├── components/     # Sidebar, Modal, DataTable, Toast...
├── pages/          # Uma pasta por rota
├── hooks/          # useLocalStorage, useToast
└── App.jsx         # Rotas e layout principal

🎨 Paleta
Background #050508
Surface #0f0f1a
Purple #7c3aed
Green #22c55e

📄 Licença
MIT © Deep Beat
