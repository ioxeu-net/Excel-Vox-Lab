
# Excel Vox Lab

### Aprenda Excel na prática, no seu ritmo e com a tutora VOX.

O **Excel Vox Lab** é um aplicativo didático desenvolvido para ajudar iniciantes a compreender os principais recursos do Microsoft Excel por meio de aulas, exercícios interativos, explicações em áudio e acompanhamento de progresso.

A proposta é transformar o aprendizado em uma experiência simples, visual e prática.

---

## 1. Objetivo do projeto

Ensinar os fundamentos do Excel e introduzir recursos intermediários e avançados, utilizando uma trilha organizada em dez módulos.

O aplicativo combina:

- Conteúdo didático organizado por aulas.
- Exercícios independentes para praticar.
- Tutora VOX com dicas progressivas.
- Introduções narradas por síntese de voz.
- Laboratório interativo de vendas.
- Questionário de revisão.
- Acompanhamento do progresso.

## 2. Público-alvo

O aplicativo foi pensado principalmente para:

- Pessoas que nunca utilizaram o Excel.
- Estudantes e profissionais iniciantes.
- Pequenos empreendedores.
- Pessoas que precisam organizar informações e controles.
- Usuários que desejam revisar fórmulas e funções.

Não é necessário ter conhecimento prévio de planilhas.

## 3. Trilha de aprendizagem

O conteúdo está dividido em dez módulos.

| Módulo | Conteúdo |
|---|---|
| 01 | Conhecendo o Excel |
| 02 | Digitando e organizando dados |
| 03 | Primeiros cálculos |
| 04 | Funções básicas |
| 05 | Tomando decisões com SE |
| 06 | Filtros e validação de dados |
| 07 | Gráficos e interpretação |
| 08 | Análise por região |
| 09 | Funções modernas |
| 10 | Projeto final: painel gerencial |

Cada módulo possui objetivos de aprendizagem, explicações e introdução narrada.

## 4. Funcionalidades

### 4.1. Aulas interativas

O usuário pode abrir os módulos, consultar explicações e marcar aulas como concluídas.

### 4.2. Exercícios práticos

O aplicativo possui dez atividades independentes, com:

- Campos de resposta.
- Verificação automática.
- Feedback sobre o desempenho.
- Registro de tentativas.
- Possibilidade de reiniciar uma atividade.

### 4.3. Tutora VOX

A tutora oferece ajuda sob demanda.

O usuário pode solicitar dicas progressivas para compreender uma questão sem receber imediatamente a resposta.

### 4.4. Áudio e narração

O aplicativo utiliza a tecnologia de síntese de voz disponível no navegador.

A narração pode ser iniciada pelo usuário e interrompida quando necessário.

A disponibilidade e a qualidade das vozes dependem do navegador e do sistema operacional.

### 4.5. Laboratório de vendas

Ambiente demonstrativo para praticar:

- Cadastro de produtos.
- Quantidades.
- Preços unitários.
- Cálculo de totais.
- Soma geral das vendas.

### 4.6. Questionário de revisão

Avaliação com cinco questões de múltipla escolha e explicações após a correção.

### 4.7. Acompanhamento do progresso

O aplicativo acompanha:

- Aulas concluídas.
- Exercícios concluídos.
- Pontuação.
- Percentual geral de progresso.

Os dados são armazenados no navegador por meio de `localStorage`.

---

## 5. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Web Speech API
- LocalStorage API

O projeto utiliza tecnologias executadas diretamente no navegador.

Não exige servidor próprio para executar as funcionalidades locais descritas nesta versão.

## 6. Estrutura do projeto

```text
excel-vox-lab/
│
├── index.html
│
├── README.md
│
├── css/
│   └── principal.css
│
├── js/
│   └── app.js
│
├── assets/
│   └── README.md
│
├── modulos/
│   └── README.md
│
└── arquivos/
    ├── README.md
    ├── dicionario-excel.json
    │
    ├── planilhas/
    │   └── Exercicio-01-Controle-de-Vendas.xlsx
    │
    └── gabaritos/
        └── Gabarito-01-Controle-de-Vendas.xlsx
```

Os arquivos e diretórios auxiliares devem ser mantidos conforme sua disponibilidade no repositório.

## 7. Como executar

### Opção 1 — Abrir diretamente

1. Baixe ou clone o repositório.
2. Localize o arquivo `index.html`.
3. Abra o arquivo em um navegador atualizado.

### Opção 2 — Executar com servidor local

Recomendado durante o desenvolvimento.

Com a extensão Live Server do Visual Studio Code:

1. Abra a pasta do projeto.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

O aplicativo será aberto em um endereço local.

## 8. Armazenamento de dados

O progresso é armazenado localmente no navegador.

Chave utilizada:

```javascript
excelVoxLab.v2
```

Isso significa que:

- O progresso permanece disponível no mesmo navegador e perfil.
- Limpar os dados do navegador pode apagar o progresso.
- O progresso não é sincronizado automaticamente entre dispositivos.
- Não existe, nesta versão, autenticação ou conta individual.

## 9. Planilhas de apoio

O projeto contempla arquivos complementares em formato XLSX.

Na estrutura original do projeto, estão previstos:

- Planilha de exercício de controle de vendas.
- Gabarito correspondente.

Os exercícios interativos do navegador não devem ser confundidos com arquivos XLSX independentes.

## 10. Acessibilidade e compatibilidade

O projeto utiliza recursos nativos da Web.

Recomenda-se utilizar versões atualizadas de:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.

A síntese de voz depende do suporte do navegador.

A interface deve ser testada em computadores, tablets e celulares antes de uma publicação definitiva.

## 11. Segurança e privacidade

Esta versão não possui backend, autenticação ou banco de dados remoto.

O progresso fica armazenado no navegador do próprio usuário.

Não se deve inserir informações pessoais, financeiras ou confidenciais nos exercícios demonstrativos.

## 12. Limitações conhecidas desta versão

Esta versão é uma base funcional de aprendizagem, não uma plataforma educacional completa.

Ainda não estão implementados:

- Cadastro e autenticação de usuários.
- Sincronização de progresso na nuvem.
- Painel administrativo.
- Emissão de certificado formal.
- Banco de dados centralizado.
- Integração com serviços externos de inteligência artificial.
- Relatórios individuais para professores.
- Exportação e importação do progresso.

O botão de situação de conclusão informa o andamento da trilha. Não representa certificação reconhecida pelo MEC.

## 13. Próximas evoluções

Possíveis melhorias para versões futuras:

1. Criar uma área individual do estudante.
2. Implementar salvamento em nuvem.
3. Desenvolver mais exercícios em formato XLSX.
4. Ampliar o conteúdo da tutora VOX.
5. Adicionar avaliações por módulo.
6. Criar painel de desempenho.
7. Permitir exportação dos resultados.
8. Desenvolver um sistema de certificados próprio, com critérios transparentes.

## 14. Licença

A licença de distribuição e utilização deste projeto deverá ser definida pelo responsável pelo repositório.

Até que uma licença seja adicionada, não se deve presumir autorização para redistribuição, comercialização ou utilização de materiais de terceiros.

## 15. Status do projeto

**Versão:** 1.0 — base de desenvolvimento

**Nome:** Excel Vox Lab

**Proposta:** aplicativo didático de Excel para iniciantes.

**Idioma:** Português do Brasil.

**Execução:** navegador Web.

---

Desenvolvido para tornar o aprendizado do Excel mais acessível, prático e acolhedor.
