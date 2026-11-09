
/* ==========================================================
   EXCEL VOX LAB
   Aplicativo didático para iniciantes
   10 módulos | 10 exercícios independentes | Tutora sob demanda
   VOX | Revisão | Laboratório | Progresso persistente
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. CONFIGURAÇÕES GERAIS
---------------------------------------------------------- */

const APP_CONFIG = {
  storageKey: "excelVoxLab.v2",
  speechRate: 0.95,
  speechPitch: 1,
  speechVolume: 1,
  totalModules: 10,
  totalExercises: 10
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const escapeHTML = value =>
  String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);

const formatCurrency = value =>
  Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

const formatNumber = value =>
  Number(value || 0).toLocaleString("pt-BR", {
    maximumFractionDigits: 2
  });

/*
  Aceita:
  1200
  1.200
  37,5
  37.5
  1.200,50
  1,200.50
*/
function numberValue(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : NaN;
  }

  let text = String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(/[R$]/gi, "");

  if (!text) return NaN;

  const comma = text.lastIndexOf(",");
  const dot = text.lastIndexOf(".");

  if (comma !== -1 && dot !== -1) {
    if (comma > dot) {
      text = text.replace(/\./g, "").replace(",", ".");
    } else {
      text = text.replace(/,/g, "");
    }
  } else if (comma !== -1) {
    text = text.replace(/\./g, "").replace(",", ".");
  } else if (dot !== -1) {
    const parts = text.split(".");
    const lastPart = parts[parts.length - 1];

    if (parts.length > 2 || lastPart.length === 3) {
      text = text.replace(/\./g, "");
    }
  }

  const result = Number(text);
  return Number.isFinite(result) ? result : NaN;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

/* ----------------------------------------------------------
   2. CONTEÚDO DOS 10 MÓDULOS
---------------------------------------------------------- */

const MODULES = [
  {
    id: 1,
    title: "Conhecendo o Excel",
    level: "Fundamentos",
    description: "Conheça a interface, as células, linhas, colunas e planilhas.",
    icon: "▦",
    objectives: [
      "Identificar a estrutura de uma planilha.",
      "Diferenciar células, linhas e colunas.",
      "Entender como os endereços das células funcionam."
    ],
    lessons: [
      {
        title: "O que é o Excel?",
        content: `
          <p>O Excel é um aplicativo de planilhas eletrônicas.
          Ele permite organizar informações, fazer cálculos e analisar dados.</p>
          <h3>Onde podemos utilizar?</h3>
          <ul>
            <li>Controle de vendas e estoque.</li>
            <li>Organização de despesas pessoais.</li>
            <li>Relatórios e indicadores de empresas.</li>
            <li>Planejamento e acompanhamento de projetos.</li>
          </ul>
          <p>Uma planilha é formada por linhas, colunas e células.
          Cada célula pode receber textos, números, datas ou fórmulas.</p>
        `
      },
      {
        title: "Células, linhas e colunas",
        content: `
          <p>As colunas são identificadas por letras: A, B, C e assim por diante.</p>
          <p>As linhas são identificadas por números: 1, 2, 3...</p>
          <p>O encontro de uma coluna com uma linha forma uma célula.</p>
          <p>Por exemplo, <strong>B3</strong> representa a célula localizada
          na coluna B e na linha 3.</p>
          <h3>Intervalos</h3>
          <p>Um intervalo é um conjunto de células. A referência
          <strong>A1:C5</strong> representa as células entre A1 e C5.</p>
        `
      }
    ],
    vox: "Bem-vindo ao Excel Vox Lab. Nesta primeira etapa, você vai conhecer o ambiente do Excel, entender como as células são organizadas e descobrir como uma planilha pode ajudar a organizar informações do dia a dia."
  },
  {
    id: 2,
    title: "Digitando e organizando dados",
    level: "Fundamentos",
    description: "Aprenda a inserir, editar, formatar e organizar informações.",
    icon: "▤",
    objectives: [
      "Inserir dados em uma planilha.",
      "Formatar números, datas e textos.",
      "Organizar informações em tabelas."
    ],
    lessons: [
      {
        title: "Inserindo informações",
        content: `
          <p>Para inserir uma informação, selecione uma célula, digite o conteúdo
          e pressione Enter.</p>
          <p>O Excel reconhece diferentes tipos de dados, como textos,
          números e datas.</p>
          <h3>Uma boa organização começa pelo cabeçalho</h3>
          <p>Use a primeira linha para identificar o conteúdo de cada coluna.
          Por exemplo: Produto, Quantidade, Preço e Total.</p>
        `
      },
      {
        title: "Formatação e organização",
        content: `
          <p>A formatação melhora a leitura e a interpretação dos dados.</p>
          <ul>
            <li>Moeda para valores financeiros.</li>
            <li>Data para registros de calendário.</li>
            <li>Porcentagem para taxas e proporções.</li>
            <li>Negrito e cores para destacar cabeçalhos.</li>
          </ul>
          <p>Uma tabela organizada facilita filtros, classificações e análises.</p>
        `
      }
    ],
    vox: "Nesta aula, vamos aprender a inserir informações e organizar uma planilha. Você verá como cabeçalhos, formatos de moeda, datas e uma boa estrutura tornam os dados mais fáceis de entender."
  },
  {
    id: 3,
    title: "Primeiros cálculos",
    level: "Fundamentos",
    description: "Entenda fórmulas, operadores e referências de células.",
    icon: "ƒx",
    objectives: [
      "Criar fórmulas simples.",
      "Utilizar operadores matemáticos.",
      "Compreender referências relativas e absolutas."
    ],
    lessons: [
      {
        title: "Como criar uma fórmula",
        content: `
          <p>Uma fórmula no Excel começa com o sinal de igual (<strong>=</strong>).</p>
          <p>Exemplos:</p>
          <ul>
            <li><code>=A1+B1</code> soma dois valores.</li>
            <li><code>=A1-B1</code> subtrai.</li>
            <li><code>=A1*B1</code> multiplica.</li>
            <li><code>=A1/B1</code> divide.</li>
          </ul>
          <p>Usar referências de células permite que os cálculos sejam
          atualizados quando os dados mudam.</p>
        `
      },
      {
        title: "Referências relativas e absolutas",
        content: `
          <p>Uma referência relativa muda quando uma fórmula é copiada.</p>
          <p>Uma referência absoluta utiliza o símbolo de cifrão.
          Por exemplo: <strong>$B$2</strong>.</p>
          <p>Ela é útil quando uma fórmula precisa utilizar sempre
          a mesma célula, como uma taxa de desconto.</p>
        `
      }
    ],
    vox: "Chegou a hora de fazer cálculos. Você vai descobrir que as fórmulas do Excel começam com o sinal de igual e podem utilizar os endereços das células. Também vamos entender por que algumas referências mudam e outras permanecem fixas."
  },
  {
    id: 4,
    title: "Funções básicas",
    level: "Intermediário",
    description: "Utilize SOMA, MÉDIA, MÁXIMO, MÍNIMO e CONT.NÚM.",
    icon: "Σ",
    objectives: [
      "Somar intervalos com SOMA.",
      "Calcular médias.",
      "Encontrar valores máximos e mínimos."
    ],
    lessons: [
      {
        title: "Função SOMA",
        content: `
          <p>A função SOMA permite adicionar vários valores.</p>
          <p>Exemplo: <code>=SOMA(B2:B10)</code>.</p>
          <p>O intervalo B2:B10 reúne as células entre B2 e B10.</p>
        `
      },
      {
        title: "MÉDIA, MÁXIMO e MÍNIMO",
        content: `
          <ul>
            <li><code>=MÉDIA(B2:B10)</code>: calcula a média.</li>
            <li><code>=MÁXIMO(B2:B10)</code>: encontra o maior valor.</li>
            <li><code>=MÍNIMO(B2:B10)</code>: encontra o menor valor.</li>
            <li><code>=CONT.NÚM(B2:B10)</code>: conta células numéricas.</li>
          </ul>
          <p>Essas funções ajudam a resumir grandes quantidades de dados.</p>
        `
      }
    ],
    vox: "Nesta etapa, você vai conhecer funções que economizam tempo. Em vez de somar cada número manualmente, poderá utilizar SOMA. Também aprenderá a calcular médias e identificar os maiores e menores valores."
  },
  {
    id: 5,
    title: "Tomando decisões com SE",
    level: "Intermediário",
    description: "Crie condições para classificar e analisar resultados.",
    icon: "◇",
    objectives: [
      "Entender testes lógicos.",
      "Criar fórmulas com SE.",
      "Combinar condições com E e OU."
    ],
    lessons: [
      {
        title: "A função SE",
        content: `
          <p>A função SE permite que o Excel tome decisões com base
          em uma condição.</p>
          <p>Exemplo:</p>
          <code>=SE(B2&gt;=7;"Aprovado";"Revisar")</code>
          <p>Se B2 for maior ou igual a 7, o resultado será Aprovado.
          Caso contrário, será Revisar.</p>
        `
      },
      {
        title: "Condições combinadas",
        content: `
          <p>A função E verifica se todas as condições são verdadeiras.</p>
          <p>A função OU verifica se pelo menos uma condição é verdadeira.</p>
          <p>Essas funções podem ser utilizadas dentro de SE para
          criar regras mais completas.</p>
        `
      }
    ],
    vox: "Agora vamos ensinar o Excel a tomar decisões. Com a função SE, podemos criar regras como aprovado ou reprovado, dentro ou fora da meta, estoque suficiente ou insuficiente."
  },
  {
    id: 6,
    title: "Filtros e validação de dados",
    level: "Intermediário",
    description: "Controle entradas e encontre informações rapidamente.",
    icon: "▽",
    objectives: [
      "Aplicar filtros.",
      "Classificar informações.",
      "Criar listas de validação."
    ],
    lessons: [
      {
        title: "Filtros e classificação",
        content: `
          <p>Os filtros permitem exibir apenas os registros que atendem
          a determinados critérios.</p>
          <p>A classificação organiza dados em ordem crescente,
          decrescente ou alfabética.</p>
        `
      },
      {
        title: "Validação de dados",
        content: `
          <p>A validação de dados ajuda a controlar o que pode ser digitado
          em uma célula.</p>
          <p>É possível criar listas de opções, limitar números e restringir
          datas.</p>
          <p>Isso reduz erros de preenchimento.</p>
        `
      }
    ],
    vox: "Nesta aula, vamos aprender a controlar e localizar informações. Os filtros mostram apenas os dados que interessam, enquanto a validação ajuda a evitar preenchimentos incorretos."
  },
  {
    id: 7,
    title: "Gráficos e interpretação",
    level: "Intermediário",
    description: "Transforme dados em representações visuais.",
    icon: "▥",
    objectives: [
      "Escolher o gráfico adequado.",
      "Interpretar tendências.",
      "Apresentar dados visualmente."
    ],
    lessons: [
      {
        title: "Tipos de gráficos",
        content: `
          <ul>
            <li>Colunas: comparar categorias.</li>
            <li>Linhas: acompanhar evolução ao longo do tempo.</li>
            <li>Pizza: representar partes de um total.</li>
            <li>Barras: comparar valores entre grupos.</li>
          </ul>
          <p>O gráfico deve ajudar a responder uma pergunta,
          e não apenas decorar a planilha.</p>
        `
      },
      {
        title: "Interpretando resultados",
        content: `
          <p>Observe tendências, diferenças, pontos altos e baixos.</p>
          <p>Um bom gráfico possui título claro, categorias legíveis
          e informações coerentes com os dados originais.</p>
        `
      }
    ],
    vox: "Os gráficos ajudam a enxergar padrões que podem passar despercebidos em uma tabela. Vamos descobrir quando utilizar colunas, linhas, barras e outros formatos para comunicar resultados."
  },
  {
    id: 8,
    title: "Análise por região",
    level: "Avançado",
    description: "Resuma dados por categorias e explore tabelas dinâmicas.",
    icon: "▦",
    objectives: [
      "Organizar bases de dados.",
      "Agrupar informações por categoria.",
      "Entender a lógica das tabelas dinâmicas."
    ],
    lessons: [
      {
        title: "Preparando a base",
        content: `
          <p>Uma base de dados deve possuir cabeçalhos claros,
          registros organizados e uma informação por coluna.</p>
          <p>Evite linhas vazias no meio da base e cabeçalhos duplicados.</p>
        `
      },
      {
        title: "Tabelas dinâmicas",
        content: `
          <p>Uma tabela dinâmica permite resumir dados por diferentes
          perspectivas.</p>
          <p>Você pode distribuir campos em Linhas, Colunas, Valores
          e Filtros.</p>
          <p>Por exemplo, é possível resumir o faturamento por região
          e categoria de produto.</p>
        `
      }
    ],
    vox: "Nesta etapa, vamos olhar para os dados de forma analítica. Você vai compreender como agrupar vendas por região, comparar categorias e utilizar a lógica das tabelas dinâmicas."
  },
  {
    id: 9,
    title: "Funções modernas",
    level: "Avançado",
    description: "Conheça funções de busca, filtragem e matrizes dinâmicas.",
    icon: "⌘",
    objectives: [
      "Entender funções de busca.",
      "Conhecer FILTRO e ÚNICO.",
      "Reconhecer diferenças entre versões do Excel."
    ],
    lessons: [
      {
        title: "Busca de informações",
        content: `
          <p>Funções de busca permitem localizar informações em tabelas.</p>
          <p>PROCX é uma alternativa moderna para procurar valores,
          quando disponível na versão utilizada.</p>
          <p>PROCV ainda é encontrado em muitas planilhas existentes.</p>
        `
      },
      {
        title: "Matrizes dinâmicas",
        content: `
          <p>Funções como FILTRO, ÚNICO e CLASSIFICAR podem retornar
          conjuntos de resultados que se expandem automaticamente.</p>
          <p>A disponibilidade depende da versão do Excel.</p>
        `
      }
    ],
    vox: "Vamos conhecer recursos modernos do Excel. As funções de busca e as matrizes dinâmicas permitem criar análises mais flexíveis, mas é importante observar a compatibilidade da versão utilizada."
  },
  {
    id: 10,
    title: "Projeto final: painel gerencial",
    level: "Projeto final",
    description: "Integre os conhecimentos em um painel de acompanhamento.",
    icon: "▣",
    objectives: [
      "Organizar uma base de vendas.",
      "Calcular indicadores.",
      "Interpretar resultados e montar um painel."
    ],
    lessons: [
      {
        title: "Construindo os indicadores",
        content: `
          <p>Um painel gerencial deve apresentar informações úteis
          para apoiar decisões.</p>
          <p>Indicadores comuns incluem faturamento, quantidade de pedidos
          e ticket médio.</p>
          <p>Ticket médio = faturamento total dividido pela quantidade
          de pedidos.</p>
        `
      },
      {
        title: "Organização do painel",
        content: `
          <p>Organize os indicadores mais importantes em destaque.</p>
          <p>Utilize gráficos que ajudem a compreender o desempenho
          por período, região ou categoria.</p>
          <p>Finalize com uma conclusão objetiva baseada nos dados.</p>
        `
      }
    ],
    vox: "Chegamos ao projeto final. Agora você vai reunir o que aprendeu para organizar dados, calcular indicadores e construir um painel gerencial que ajude a compreender os resultados de uma operação."
  }
];

/* ----------------------------------------------------------
   3. MATRIZ DOS 10 EXERCÍCIOS
   Cada exercício possui seu próprio ambiente e estado.
---------------------------------------------------------- */

const EXERCISES = [
  {
    id: 1,
    title: "Organizando produtos",
    description: "Identifique os campos e organize uma pequena lista.",
    module: 1,
    objective: "Preencha os campos solicitados.",
    hints: [
      "Observe que cada coluna representa um tipo de informação.",
      "O endereço de uma célula combina a letra da coluna com o número da linha.",
      "A primeira célula da segunda coluna é B1."
    ],
    fields: [
      { id: "product", label: "Produto", type: "text", expected: "Caderno" },
      { id: "quantity", label: "Quantidade", type: "number", expected: 8 },
      { id: "cell", label: "Endereço da célula da coluna B e linha 2", type: "text", expected: "B2" }
    ]
  },
  {
    id: 2,
    title: "Controle de despesas",
    description: "Classifique despesas e reconheça os formatos adequados.",
    module: 2,
    objective: "Informe os formatos corretos.",
    hints: [
      "Valores financeiros devem utilizar o formato de moeda.",
      "Datas devem ser apresentadas em um formato de calendário.",
      "O formato de moeda pode ser identificado por R$."
    ],
    fields: [
      { id: "valueFormat", label: "Formato para valores financeiros", type: "text", expected: "Moeda" },
      { id: "dateFormat", label: "Formato para datas", type: "text", expected: "Data" },
      { id: "header", label: "O cabeçalho deve estar destacado?", type: "select", options: ["Selecione", "Sim", "Não"], expected: "Sim" }
    ]
  },
  {
    id: 3,
    title: "Fórmulas e referências",
    description: "Calcule subtotais e identifique referências fixas.",
    module: 3,
    objective: "Resolva os cálculos e indique a referência absoluta.",
    hints: [
      "Subtotal é quantidade multiplicada pelo preço unitário.",
      "6 unidades a R$ 5,00 custam R$ 30,00.",
      "Uma referência absoluta possui cifrões antes da coluna e da linha."
    ],
    fields: [
      { id: "subtotal", label: "Subtotal: 6 × R$ 5,00", type: "number", expected: 30 },
      { id: "discount", label: "Referência absoluta da célula B2", type: "text", expected: "$B$2" }
    ]
  },
  {
    id: 4,
    title: "Resumo de resultados",
    description: "Utilize funções essenciais para resumir uma lista.",
    module: 4,
    objective: "Informe os resultados das funções.",
    hints: [
      "SOMA adiciona todos os valores.",
      "A média é a soma dividida pela quantidade de números.",
      "Considere os valores 10, 20 e 30."
    ],
    fields: [
      { id: "sum", label: "Soma de 10, 20 e 30", type: "number", expected: 60 },
      { id: "average", label: "Média de 10, 20 e 30", type: "number", expected: 20 },
      { id: "maximum", label: "Maior valor da lista", type: "number", expected: 30 }
    ]
  },
  {
    id: 5,
    title: "Decisões com SE",
    description: "Classifique resultados com condições.",
    module: 5,
    objective: "Aplique a regra de aprovação.",
    hints: [
      "A nota mínima para aprovação é 7.",
      "Uma nota 8 atende à condição.",
      "O resultado será Aprovado."
    ],
    fields: [
      { id: "grade", label: "Resultado para nota 8 com mínimo 7", type: "text", expected: "Aprovado" },
      { id: "formula", label: "Qual função permite testar uma condição?", type: "text", expected: "SE" }
    ]
  },
  {
    id: 6,
    title: "Filtros e validação",
    description: "Identifique como controlar e localizar dados.",
    module: 6,
    objective: "Escolha as ferramentas adequadas.",
    hints: [
      "O filtro permite exibir apenas os registros desejados.",
      "A validação restringe os dados aceitos em uma célula.",
      "Uma lista suspensa é um exemplo de validação."
    ],
    fields: [
      { id: "filter", label: "Ferramenta para exibir somente alguns registros", type: "text", expected: "Filtro" },
      { id: "validation", label: "Ferramenta para restringir entradas", type: "text", expected: "Validação de dados" }
    ]
  },
  {
    id: 7,
    title: "Gráficos e análise",
    description: "Escolha gráficos adequados para cada situação.",
    module: 7,
    objective: "Relacione o objetivo ao tipo de gráfico.",
    hints: [
      "Para acompanhar uma evolução ao longo dos meses, pense em continuidade.",
      "Gráficos de linhas são úteis para acompanhar tendências.",
      "Para comparar categorias, gráficos de colunas são uma boa opção."
    ],
    fields: [
      { id: "trend", label: "Gráfico para evolução mensal", type: "text", expected: "Linhas" },
      { id: "compare", label: "Gráfico para comparar categorias", type: "text", expected: "Colunas" }
    ]
  },
  {
    id: 8,
    title: "Análise por região",
    description: "Organize os campos de uma tabela dinâmica.",
    module: 8,
    objective: "Distribua os campos nas áreas corretas.",
    hints: [
      "A região deve agrupar os registros.",
      "O valor financeiro será resumido na área de Valores.",
      "A operação solicitada é uma soma."
    ],
    fields: [
      { id: "region", label: "Área para o campo Região", type: "text", expected: "Linhas" },
      { id: "amount", label: "Área para o campo Valor", type: "text", expected: "Valores" },
      { id: "operation", label: "Operação para somar o faturamento", type: "text", expected: "Soma" }
    ]
  },
  {
    id: 9,
    title: "Funções modernas",
    description: "Conheça funções de filtragem, unicidade e classificação.",
    module: 9,
    objective: "Identifique a função adequada.",
    hints: [
      "FILTRO retorna registros que atendem a uma condição.",
      "ÚNICO remove repetições de uma lista.",
      "CLASSIFICAR organiza os resultados."
    ],
    fields: [
      { id: "filter", label: "Função que retorna registros por condição", type: "text", expected: "FILTRO" },
      { id: "unique", label: "Função que remove duplicidades", type: "text", expected: "ÚNICO" },
      { id: "sort", label: "Função que ordena resultados", type: "text", expected: "CLASSIFICAR" }
    ]
  },
  {
    id: 10,
    title: "Painel gerencial",
    description: "Calcule indicadores para um pequeno painel de vendas.",
    module: 10,
    objective: "Calcule faturamento, pedidos e ticket médio.",
    hints: [
      "O faturamento é a soma dos valores vendidos.",
      "O ticket médio é o faturamento dividido pela quantidade de pedidos.",
      "R$ 900 divididos por 30 pedidos resultam em R$ 30."
    ],
    fields: [
      { id: "revenue", label: "Faturamento total", type: "number", expected: 900 },
      { id: "orders", label: "Quantidade de pedidos", type: "number", expected: 30 },
      { id: "average", label: "Ticket médio", type: "number", expected: 30 }
    ]
  }
];

/* ----------------------------------------------------------
   4. REVISÃO — QUESTIONÁRIO
---------------------------------------------------------- */

const QUIZ_QUESTIONS = [
  {
    question: "Qual é a combinação que identifica uma célula?",
    options: ["Uma letra e um número", "Dois números", "Duas letras", "Um símbolo e uma data"],
    answer: 0,
    explanation: "Uma célula é identificada pela letra da coluna e pelo número da linha. Exemplo: B3."
  },
  {
    question: "Qual símbolo inicia uma fórmula no Excel?",
    options: ["#", "=", "@", "%"],
    answer: 1,
    explanation: "As fórmulas do Excel começam com o sinal de igual."
  },
  {
    question: "Qual função calcula a média de valores?",
    options: ["SOMA", "MÁXIMO", "MÉDIA", "CONT.NÚM"],
    answer: 2,
    explanation: "A função MÉDIA calcula a média aritmética dos valores informados."
  },
  {
    question: "Qual função permite testar uma condição?",
    options: ["SE", "SOMA", "MÍNIMO", "ÚNICO"],
    answer: 0,
    explanation: "A função SE retorna resultados diferentes conforme uma condição."
  },
  {
    question: "Qual gráfico é indicado para acompanhar a evolução mensal?",
    options: ["Pizza", "Linha", "Dispersão", "Radar"],
    answer: 1,
    explanation: "O gráfico de linhas é uma opção adequada para acompanhar tendências ao longo do tempo."
  }
];

/* ----------------------------------------------------------
   5. ESTADO E PERSISTÊNCIA
---------------------------------------------------------- */

function createInitialState() {
  return {
    lessonsCompleted: [],
    exercises: {},
    quiz: {
      answers: {},
      completed: false,
      score: 0
    },
    sales: {
      rows: [
        { product: "Caneta", quantity: 12, price: 2 },
        { product: "Caderno", quantity: 8, price: 10 },
        { product: "Agenda", quantity: 5, price: 15 }
      ]
    }
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(APP_CONFIG.storageKey);

    if (!stored) return createInitialState();

    const parsed = JSON.parse(stored);
    const initial = createInitialState();

    return {
      ...initial,
      ...parsed,
      lessonsCompleted: Array.isArray(parsed.lessonsCompleted)
        ? parsed.lessonsCompleted
        : [],
      exercises: parsed.exercises && typeof parsed.exercises === "object"
        ? parsed.exercises
        : {},
      quiz: {
        ...initial.quiz,
        ...(parsed.quiz || {})
      },
      sales: {
        ...initial.sales,
        ...(parsed.sales || {})
      }
    };
  } catch (error) {
    console.warn("Não foi possível recuperar o progresso:", error);
    return createInitialState();
  }
}

let appState = loadState();
let activeExerciseId = null;
let activeLessonId = null;
let speechUtterance = null;

function saveState() {
  try {
    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(appState)
    );
  } catch (error) {
    console.error("Não foi possível salvar o progresso:", error);
  }
}

/* ----------------------------------------------------------
   6. PROGRESSO DOS EXERCÍCIOS
---------------------------------------------------------- */

function getExerciseState(id) {
  if (!appState.exercises[id]) {
    appState.exercises[id] = {
      values: {},
      hintsUsed: 0,
      attempts: 0,
      completed: false,
      score: 0
    };
  }

  return appState.exercises[id];
}

function getCompletedExercises() {
  return EXERCISES.filter(exercise =>
    getExerciseState(exercise.id).completed
  ).length;
}

function getCompletedLessons() {
  return appState.lessonsCompleted.length;
}

function getPoints() {
  const lessonPoints = getCompletedLessons() * 10;

  const exercisePoints = EXERCISES.reduce((total, exercise) => {
    return total + (getExerciseState(exercise.id).score || 0);
  }, 0);

  return lessonPoints + exercisePoints;
}

function getOverallProgress() {
  const lessonProgress = getCompletedLessons();
  const exerciseProgress = getCompletedExercises();

  const total = APP_CONFIG.totalModules + APP_CONFIG.totalExercises;
  const completed = lessonProgress + exerciseProgress;

  return Math.round((completed / total) * 100);
}

function updateProgress() {
  const lessons = getCompletedLessons();
  const exercises = getCompletedExercises();
  const points = getPoints();
  const progress = getOverallProgress();

  const elements = {
    statLessons: $("#statLessons"),
    statProgress: $("#statProgress"),
    statPoints: $("#statPoints"),
    progressBig: $("#progressBig"),
    progressBar: $("#progressBar"),
    progressMessage: $("#progressMessage"),
    exerciseProgress: $("#exerciseProgress"),
    nextRecommendation: $("#nextRecommendation"),
    certificateBtn: $("#certificateBtn"),
    exerciseCount: $("#completedCount"),
    progressPercent: $("#progressPercent")
  };

  if (elements.statLessons) {
    elements.statLessons.textContent = lessons;
  }

  if (elements.statProgress) {
    elements.statProgress.textContent = `${progress}%`;
  }

  if (elements.statPoints) {
    elements.statPoints.textContent = points;
  }

  if (elements.progressBig) {
    elements.progressBig.textContent = `${progress}%`;
  }

  if (elements.progressBar) {
    elements.progressBar.style.width = `${progress}%`;
  }

  if (elements.progressMessage) {
    elements.progressMessage.textContent =
      progress === 100
        ? "Parabéns! Você concluiu todas as aulas e atividades."
        : `${lessons} de 10 aulas e ${exercises} de 10 exercícios concluídos.`;
  }

  if (elements.exerciseProgress) {
    elements.exerciseProgress.innerHTML = `
      <div class="exercise-progress-info">
        <strong>${exercises} de 10 exercícios concluídos</strong>
        <span>${Math.round((exercises / 10) * 100)}%</span>
      </div>
      <div class="progress-track">
        <i style="width:${exercises * 10}%"></i>
      </div>
    `;
  }

  if (elements.nextRecommendation) {
    const next = MODULES.find(module =>
      !appState.lessonsCompleted.includes(module.id)
    );

    elements.nextRecommendation.textContent = next
      ? `Continue pelo módulo ${next.id}: ${next.title}.`
      : "Sua trilha de aulas está concluída. Revise os exercícios e confira seu resultado.";
  }

  if (elements.certificateBtn) {
    elements.certificateBtn.textContent =
      lessons === 10 && exercises === 10
        ? "Ver situação de conclusão"
        : "Ver situação";
  }

  renderModuleCards();
  renderExerciseCards();
  saveState();
}

/* ----------------------------------------------------------
   7. CARTÕES DOS MÓDULOS
---------------------------------------------------------- */

function renderModuleCards() {
  const container = $("#moduleGrid");
  if (!container) return;

  container.innerHTML = MODULES.map(module => {
    const completed = appState.lessonsCompleted.includes(module.id);

    return `
      <article class="module-card ${completed ? "completed" : ""}">
        <div class="module-card-top">
          <span class="module-icon">${module.icon}</span>
          <span class="module-number">MÓDULO ${String(module.id).padStart(2, "0")}</span>
        </div>

        <span class="module-level">${escapeHTML(module.level)}</span>

        <h3>${escapeHTML(module.title)}</h3>

        <p>${escapeHTML(module.description)}</p>

        <div class="module-card-footer">
          <span>${completed ? "✓ Aula concluída" : "Aula disponível"}</span>
          <button
            class="btn ${completed ? "ghost" : "primary"}"
            type="button"
            data-open-module="${module.id}">
            ${completed ? "Revisar aula" : "Abrir aula"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

/* ----------------------------------------------------------
   8. AULAS
---------------------------------------------------------- */

function renderLesson(moduleId) {
  const module = MODULES.find(item => item.id === Number(moduleId));
  const container = $("#lessonContent");
  const dialog = $("#lessonDialog");

  if (!module || !container) return;

  activeLessonId = module.id;

  const completed = appState.lessonsCompleted.includes(module.id);

  container.innerHTML = `
    <h2 id="lessonDialogTitle">${escapeHTML(module.title)}</h2>

    <p class="lesson-intro">${escapeHTML(module.description)}</p>

    <div class="lesson-objectives">
      <h3>O que você vai aprender</h3>
      <ul>
        ${module.objectives.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
      </ul>
    </div>

    ${module.lessons.map((lesson, index) => `
      <article class="lesson-content-block">
        <span class="eyebrow">PARTE ${index + 1}</span>
        <h3>${escapeHTML(lesson.title)}</h3>
        ${lesson.content}
      </article>
    `).join("")}

    <div class="lesson-actions">
      <button
        type="button"
        class="btn primary"
        data-complete-lesson="${module.id}">
        ${completed ? "Aula já concluída" : "Marcar aula como concluída"}
      </button>

      <button
        type="button"
        class="btn ghost"
        data-speak-module="${module.id}">
        ▶ Ouvir introdução desta aula
      </button>
    </div>
  `;

  if (dialog && typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else if (dialog) {
    dialog.setAttribute("open", "");
  }
}

function closeLesson() {
  const dialog = $("#lessonDialog");

  if (!dialog) return;

  if (typeof dialog.close === "function" && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function completeLesson(moduleId) {
  const id = Number(moduleId);

  if (!MODULES.some(module => module.id === id)) return;

  if (!appState.lessonsCompleted.includes(id)) {
    appState.lessonsCompleted.push(id);
  }

  saveState();
  updateProgress();
  renderLesson(id);
}

/* ----------------------------------------------------------
   9. EXERCÍCIOS
---------------------------------------------------------- */

function renderExerciseCards() {
  const container = $("#exerciseGrid");
  if (!container) return;

  container.innerHTML = EXERCISES.map(exercise => {
    const state = getExerciseState(exercise.id);
    const completed = state.completed;

    return `
      <article class="exercise-card ${completed ? "completed" : ""}">
        <div class="exercise-card-top">
          <span class="exercise-number">
            EXERCÍCIO ${String(exercise.id).padStart(2, "0")}
          </span>
          <span>${completed ? "✓ Concluído" : "Disponível"}</span>
        </div>

        <h3>${escapeHTML(exercise.title)}</h3>

        <p>${escapeHTML(exercise.description)}</p>

        <small>Módulo ${String(exercise.module).padStart(2, "0")}</small>

        <button
          type="button"
          class="btn ${completed ? "ghost" : "primary"}"
          data-open-exercise="${exercise.id}">
          ${completed ? "Revisar exercício" : "Começar exercício"}
        </button>
      </article>
    `;
  }).join("");
}

function renderField(field, savedValue) {
  const value = savedValue ?? "";

  if (field.type === "select") {
    return `
      <label class="exercise-field">
        <span>${escapeHTML(field.label)}</span>
        <select data-exercise-field="${escapeHTML(field.id)}">
          ${field.options.map(option => `
            <option
              value="${escapeHTML(option)}"
              ${option === value ? "selected" : ""}>
              ${escapeHTML(option)}
            </option>
          `).join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="exercise-field">
      <span>${escapeHTML(field.label)}</span>
      <input
        type="${field.type === "number" ? "text" : "text"}"
        inputmode="${field.type === "number" ? "decimal" : "text"}"
        autocomplete="off"
        data-exercise-field="${escapeHTML(field.id)}"
        value="${escapeHTML(value)}"
        placeholder="Digite sua resposta">
    </label>
  `;
}

function renderExerciseWorkspace(exerciseId) {
  const exercise = EXERCISES.find(item => item.id === Number(exerciseId));
  const container = $("#exerciseWorkspace");

  if (!exercise || !container) return;

  activeExerciseId = exercise.id;

  const state = getExerciseState(exercise.id);

  container.innerHTML = `
    <div class="exercise-workspace-inner">
      <div class="exercise-workspace-head">
        <div>
          <span class="eyebrow">AMBIENTE DE PRÁTICA</span>
          <h3>${escapeHTML(exercise.title)}</h3>
          <p>${escapeHTML(exercise.objective)}</p>
        </div>

        <span class="exercise-status">
          ${state.completed ? "Concluído" : "Em andamento"}
        </span>
      </div>

      <div class="exercise-instructions">
        <strong>Desafio</strong>
        <p>${escapeHTML(exercise.description)}</p>
      </div>

      <div class="exercise-fields">
        ${exercise.fields.map(field =>
          renderField(field, state.values[field.id])
        ).join("")}
      </div>

      <div class="exercise-feedback" id="exerciseFeedback" aria-live="polite">
        ${state.completed
          ? `<p>Você já concluiu esta atividade. Pode revisar as respostas ou reiniciar.</p>`
          : ""}
      </div>

      <div class="exercise-actions">
        <button type="button" class="btn primary" data-validate-exercise="${exercise.id}">
          Conferir respostas
        </button>

        <button type="button" class="btn ghost" data-tutor-exercise="${exercise.id}">
          Preciso de ajuda
        </button>

        <button type="button" class="btn ghost" data-reset-exercise="${exercise.id}">
          Reiniciar exercício
        </button>
      </div>

      <div class="tutor-panel" id="tutorPanel" hidden>
        <div class="tutor-card">
          <span class="eyebrow">TUTORA VOX</span>
          <h4>Vamos pensar juntos?</h4>
          <p id="tutorMessage"></p>

          <div class="tutor-actions">
            <button type="button" class="btn primary" data-next-hint="${exercise.id}">
              Próxima dica
            </button>
            <button type="button" class="btn ghost" data-close-tutor>
              Fechar ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

function readExerciseValues(exerciseId) {
  const exercise = EXERCISES.find(item => item.id === Number(exerciseId));
  const container = $("#exerciseWorkspace");

  if (!exercise || !container) return {};

  const values = {};

  $$("[data-exercise-field]", container).forEach(input => {
    values[input.dataset.exerciseField] = input.value.trim();
  });

  return values;
}

function normalizeAnswer(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isAnswerCorrect(field, value) {
  if (field.type === "number") {
    const actual = numberValue(value);
    const expected = numberValue(field.expected);

    return Number.isFinite(actual) &&
      Number.isFinite(expected) &&
      Math.abs(actual - expected) < 0.001;
  }

  return normalizeAnswer(value) === normalizeAnswer(field.expected);
}

function validateExercise(exerciseId) {
  const exercise = EXERCISES.find(item => item.id === Number(exerciseId));
  if (!exercise) return;

  const state = getExerciseState(exercise.id);
  const values = readExerciseValues(exercise.id);

  state.values = values;
  state.attempts += 1;

  const results = exercise.fields.map(field => ({
    field,
    correct: isAnswerCorrect(field, values[field.id])
  }));

  const correctCount = results.filter(item => item.correct).length;
  const total = exercise.fields.length;
  const percentage = Math.round((correctCount / total) * 100);

  state.score = Math.max(state.score || 0, percentage);

  if (correctCount === total) {
    state.completed = true;
  }

  saveState();

  const feedback = $("#exerciseFeedback");

  if (feedback) {
    feedback.innerHTML = `
      <div class="feedback-result ${correctCount === total ? "success" : "incomplete"}">
        <strong>${correctCount === total ? "Muito bem! Exercício concluído." : "Vamos continuar praticando."}</strong>
        <p>${correctCount} de ${total} respostas corretas (${percentage}%).</p>

        <ul>
          ${results.map(result => `
            <li>
              ${result.correct ? "✓" : "○"}
              ${escapeHTML(result.field.label)}
              ${result.correct ? "" : " — confira sua resposta"}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  updateProgress();
  renderExerciseCards();
}

/* ----------------------------------------------------------
   10. TUTORA SOB DEMANDA — DICAS PROGRESSIVAS
---------------------------------------------------------- */

function openTutor(exerciseId) {
  const exercise = EXERCISES.find(item => item.id === Number(exerciseId));
  const state = getExerciseState(exerciseId);
  const panel = $("#tutorPanel");
  const message = $("#tutorMessage");

  if (!exercise || !panel || !message) return;

  panel.hidden = false;

  const index = Math.min(
    state.hintsUsed,
    exercise.hints.length - 1
  );

  message.textContent = exercise.hints[index];

  const nextButton = $("[data-next-hint]", panel);

  if (nextButton) {
    nextButton.disabled = state.hintsUsed >= exercise.hints.length;
    nextButton.textContent =
      state.hintsUsed >= exercise.hints.length
        ? "Todas as dicas exibidas"
        : "Próxima dica";
  }
}

function showNextHint(exerciseId) {
  const exercise = EXERCISES.find(item => item.id === Number(exerciseId));
  const state = getExerciseState(exerciseId);

  if (!exercise) return;

  if (state.hintsUsed < exercise.hints.length) {
    state.hintsUsed += 1;
  }

  saveState();

  const panel = $("#tutorPanel");
  const message = $("#tutorMessage");

  if (!panel || !message) return;

  if (state.hintsUsed >= exercise.hints.length) {
    message.textContent =
      "Você chegou à última dica. Tente aplicar o raciocínio e confira suas respostas.";
  } else {
    message.textContent = exercise.hints[state.hintsUsed];
  }

  const nextButton = $("[data-next-hint]", panel);

  if (nextButton) {
    nextButton.disabled = state.hintsUsed >= exercise.hints.length;
    nextButton.textContent =
      nextButton.disabled ? "Todas as dicas exibidas" : "Próxima dica";
  }
}

function closeTutor() {
  const panel = $("#tutorPanel");
  if (panel) panel.hidden = true;
}

function resetExercise(exerciseId) {
  const id = Number(exerciseId);

  appState.exercises[id] = {
    values: {},
    hintsUsed: 0,
    attempts: 0,
    completed: false,
    score: 0
  };

  saveState();
  renderExerciseWorkspace(id);
  updateProgress();
}

/* ----------------------------------------------------------
   11. VOX — SÍNTESE DE FALA DO NAVEGADOR
---------------------------------------------------------- */

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  speechUtterance = null;
}

function speakText(text, rate = APP_CONFIG.speechRate) {
  if (!("speechSynthesis" in window)) {
    alert("A síntese de fala não está disponível neste navegador.");
    return;
  }

  stopSpeech();

  speechUtterance = new SpeechSynthesisUtterance(
    String(text || "")
  );

  speechUtterance.lang = "pt-BR";
  speechUtterance.rate = Math.min(1.15, Math.max(0.75, Number(rate) || 0.95));
  speechUtterance.pitch = APP_CONFIG.speechPitch;
  speechUtterance.volume = APP_CONFIG.speechVolume;

  const voices = window.speechSynthesis.getVoices();
  const portugueseVoice = voices.find(voice =>
    voice.lang.toLowerCase().startsWith("pt")
  );

  if (portugueseVoice) {
    speechUtterance.voice = portugueseVoice;
  }

  window.speechSynthesis.speak(speechUtterance);
}

function speakIntroduction() {
  const text = `
    Bem-vindo ao Excel Vox Lab.
    ${MODULES.map(module => module.vox).join(" ")}
  `;

  const rate = $("#voiceRate")?.value || APP_CONFIG.speechRate;
  speakText(text, rate);
}

function speakModule(moduleId) {
  const module = MODULES.find(item => item.id === Number(moduleId));
  if (!module) return;

  const rate = $("#voiceRate")?.value || APP_CONFIG.speechRate;
  speakText(module.vox, rate);
}

/* ----------------------------------------------------------
   12. LABORATÓRIO DE VENDAS
---------------------------------------------------------- */

function renderSalesLab() {
  const table = $("#salesTable");
  if (!table) return;

  const rows = appState.sales.rows || [];

  table.innerHTML = `
    <thead>
      <tr>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Preço unitário</th>
        <th>Total</th>
        <th>Ação</th>
      </tr>
    </thead>

    <tbody>
      ${rows.map((row, index) => `
        <tr>
          <td>
            <input
              type="text"
              value="${escapeHTML(row.product)}"
              data-sales-field="product"
              data-sales-index="${index}"
              aria-label="Produto da linha ${index + 1}">
          </td>

          <td>
            <input
              type="number"
              min="0"
              step="1"
              value="${escapeHTML(row.quantity)}"
              data-sales-field="quantity"
              data-sales-index="${index}"
              aria-label="Quantidade da linha ${index + 1}">
          </td>

          <td>
            <input
              type="number"
              min="0"
              step="0.01"
              value="${escapeHTML(row.price)}"
              data-sales-field="price"
              data-sales-index="${index}"
              aria-label="Preço da linha ${index + 1}">
          </td>

          <td>${formatCurrency(
            Number(row.quantity || 0) * Number(row.price || 0)
          )}</td>

          <td>
            <button
              type="button"
              class="btn ghost"
              data-remove-sales-row="${index}"
              aria-label="Remover linha ${index + 1}">
              Remover
            </button>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `;

  const total = rows.reduce((sum, row) => {
    return sum + (
      Number(row.quantity || 0) * Number(row.price || 0)
    );
  }, 0);

  const totalElement = $("#grandTotal");

  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }

  saveState();
}

function addSalesRow() {
  appState.sales.rows.push({
    product: "",
    quantity: 1,
    price: 0
  });

  renderSalesLab();
}

function resetSalesLab() {
  appState.sales.rows = [
    { product: "Caneta", quantity: 12, price: 2 },
    { product: "Caderno", quantity: 8, price: 10 },
    { product: "Agenda", quantity: 5, price: 15 }
  ];

  renderSalesLab();
}

function updateSalesField(input) {
  const index = Number(input.dataset.salesIndex);
  const field = input.dataset.salesField;

  if (!Number.isInteger(index) || !appState.sales.rows[index]) return;

  if (!["product", "quantity", "price"].includes(field)) return;

  let value = input.value;

  if (field === "quantity" || field === "price") {
    value = Math.max(0, numberValue(value) || 0);
  }

  appState.sales.rows[index][field] = value;

  renderSalesLab();
}

function removeSalesRow(index) {
  if (!appState.sales.rows[index]) return;

  appState.sales.rows.splice(index, 1);
  renderSalesLab();
}

/* ----------------------------------------------------------
   13. REVISÃO E QUESTIONÁRIO
---------------------------------------------------------- */

function renderQuiz() {
  const container = $("#quizCard");
  if (!container) return;

  const answers = appState.quiz.answers || {};

  container.innerHTML = `
    <div class="quiz-intro">
      <span class="eyebrow">AVALIAÇÃO DE CONHECIMENTOS</span>
      <h3>Teste o que você aprendeu</h3>
      <p>Responda às cinco questões e confira as explicações.</p>
    </div>

    ${QUIZ_QUESTIONS.map((question, index) => `
      <fieldset class="quiz-question">
        <legend>
          ${index + 1}. ${escapeHTML(question.question)}
        </legend>

        <div class="quiz-options">
          ${question.options.map((option, optionIndex) => `
            <label class="quiz-option">
              <input
                type="radio"
                name="quiz-${index}"
                value="${optionIndex}"
                data-quiz-question="${index}"
                ${String(answers[index]) === String(optionIndex) ? "checked" : ""}>
              <span>${escapeHTML(option)}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>
    `).join("")}

    <div class="quiz-actions">
      <button type="button" class="btn primary" id="submitQuiz">
        Corrigir avaliação
      </button>

      <button type="button" class="btn ghost" id="resetQuiz">
        Refazer avaliação
      </button>
    </div>

    <div id="quizFeedback" aria-live="polite">
      ${appState.quiz.completed
        ? `<p>Último resultado: ${appState.quiz.score} de ${QUIZ_QUESTIONS.length} acertos.</p>`
        : ""}
    </div>
  `;
}

function submitQuiz() {
  const answers = appState.quiz.answers || {};

  if (Object.keys(answers).length < QUIZ_QUESTIONS.length) {
    alert("Responda a todas as questões antes de corrigir.");
    return;
  }

  let score = 0;

  const results = QUIZ_QUESTIONS.map((question, index) => {
    const correct = Number(answers[index]) === question.answer;

    if (correct) score += 1;

    return {
      correct,
      explanation: question.explanation
    };
  });

  appState.quiz.completed = true;
  appState.quiz.score = score;

  saveState();

  const feedback = $("#quizFeedback");

  if (feedback) {
    feedback.innerHTML = `
      <div class="quiz-result">
        <h3>Resultado: ${score} de ${QUIZ_QUESTIONS.length}</h3>
        <p>${score >= 4
          ? "Excelente! Você demonstrou bom domínio dos fundamentos."
          : "Continue estudando. Revise as aulas e tente novamente."}</p>

        <ol>
          ${results.map((result, index) => `
            <li>
              <strong>${result.correct ? "Correto" : "Revise"}:</strong>
              ${escapeHTML(result.explanation)}
            </li>
          `).join("")}
        </ol>
      </div>
    `;
  }
}

function resetQuiz() {
  appState.quiz = {
    answers: {},
    completed: false,
    score: 0
  };

  saveState();
  renderQuiz();
}

/* ----------------------------------------------------------
   14. CERTIFICAÇÃO — SITUAÇÃO DE CONCLUSÃO
---------------------------------------------------------- */

function showCertificateStatus() {
  const lessons = getCompletedLessons();
  const exercises = getCompletedExercises();

  if (lessons === 10 && exercises === 10) {
    alert(
      "Parabéns! Você concluiu os 10 módulos e os 10 exercícios do Excel Vox Lab.\n\n" +
      "Este aplicativo registra sua conclusão de aprendizagem. " +
      "Ele não emite diploma ou certificado reconhecido pelo MEC."
    );
    return;
  }

  alert(
    "Sua trilha ainda está em andamento.\n\n" +
    `Aulas concluídas: ${lessons}/10\n` +
    `Exercícios concluídos: ${exercises}/10\n\n` +
    "Continue praticando para completar o percurso."
  );
}

/* ----------------------------------------------------------
   15. EVENTOS DA APLICAÇÃO
---------------------------------------------------------- */

function handleClick(event) {
  const target = event.target;

  const moduleButton = target.closest("[data-open-module]");
  if (moduleButton) {
    renderLesson(moduleButton.dataset.openModule);
    return;
  }

  const exerciseButton = target.closest("[data-open-exercise]");
  if (exerciseButton) {
    renderExerciseWorkspace(exerciseButton.dataset.openExercise);
    return;
  }

  const completeButton = target.closest("[data-complete-lesson]");
  if (completeButton) {
    completeLesson(completeButton.dataset.completeLesson);
    return;
  }

  const moduleSpeechButton = target.closest("[data-speak-module]");
  if (moduleSpeechButton) {
    speakModule(moduleSpeechButton.dataset.speakModule);
    return;
  }

  const validateButton = target.closest("[data-validate-exercise]");
  if (validateButton) {
    validateExercise(validateButton.dataset.validateExercise);
    return;
  }

  const tutorButton = target.closest("[data-tutor-exercise]");
  if (tutorButton) {
    openTutor(tutorButton.dataset.tutorExercise);
    return;
  }

  const hintButton = target.closest("[data-next-hint]");
  if (hintButton) {
    showNextHint(hintButton.dataset.nextHint);
    return;
  }

  const resetButton = target.closest("[data-reset-exercise]");
  if (resetButton) {
    resetExercise(resetButton.dataset.resetExercise);
    return;
  }

  if (target.closest("[data-close-tutor]")) {
    closeTutor();
    return;
  }

  const removeRowButton = target.closest("[data-remove-sales-row]");
  if (removeRowButton) {
    removeSalesRow(Number(removeRowButton.dataset.removeSalesRow));
    return;
  }

  if (target.closest("#addRow")) {
    addSalesRow();
    return;
  }

  if (target.closest("#resetLab")) {
    resetSalesLab();
    return;
  }

  if (target.closest("#speakBtn")) {
    speakIntroduction();
    return;
  }

  if (target.closest("#stopSpeak")) {
    stopSpeech();
    return;
  }

  if (target.closest("#closeLesson")) {
    closeLesson();
    return;
  }

  if (target.closest("#certificateBtn")) {
    showCertificateStatus();
    return;
  }

  if (target.closest("#submitQuiz")) {
    submitQuiz();
    return;
  }

  if (target.closest("#resetQuiz")) {
    resetQuiz();
  }
}

function handleInput(event) {
  const target = event.target;

  if (target.matches("[data-exercise-field]") && activeExerciseId !== null) {
    const state = getExerciseState(activeExerciseId);
    state.values = readExerciseValues(activeExerciseId);
    saveState();
    return;
  }

  if (target.matches("[data-sales-field]")) {
    updateSalesField(target);
    return;
  }

  if (target.matches("[data-quiz-question]")) {
    const question = target.dataset.quizQuestion;

    appState.quiz.answers[question] = Number(target.value);
    appState.quiz.completed = false;

    saveState();
    return;
  }
}

function initializeEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleInput);

  const dialog = $("#lessonDialog");

  if (dialog) {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) {
        closeLesson();
      }
    });
  }

  const rateInput = $("#voiceRate");

  if (rateInput) {
    rateInput.addEventListener("input", () => {
      if (speechUtterance && window.speechSynthesis.speaking) {
        const rate = Number(rateInput.value);
        window.speechSynthesis.cancel();
        speechUtterance.rate = rate;
        window.speechSynthesis.speak(speechUtterance);
      }
    });
  }

  window.addEventListener("beforeunload", stopSpeech);
}

/* ----------------------------------------------------------
   16. INICIALIZAÇÃO
---------------------------------------------------------- */

function initializeApp() {
  renderModuleCards();
  renderExerciseCards();
  renderSalesLab();
  renderQuiz();

  initializeEvents();
  updateProgress();

  if (!("speechSynthesis" in window)) {
    const speakButton = $("#speakBtn");

    if (speakButton) {
      speakButton.disabled = true;
      speakButton.title = "Síntese de fala não disponível neste navegador.";
    }
  }

  console.info("Excel Vox Lab inicializado.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
