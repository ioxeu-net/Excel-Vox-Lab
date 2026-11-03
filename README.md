# Excel Vox Lab

Primeira entrega funcional da plataforma educacional.

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Para publicar, envie a pasta inteira ao repositório GitHub `ioxeu-net/Excel-Vox-Lab`, preservando a estrutura.
4. No GitHub Pages, configure a publicação pela branch `main` e pasta raiz.

## Estrutura
- `index.html`: entrada única do aluno.
- `css/principal.css`: identidade visual responsiva.
- `js/app.js`: módulos, laboratório, VOX, revisão e progresso local.
- `arquivos/planilhas/`: exercícios XLSX com fórmulas.
- `arquivos/gabaritos/`: respostas em arquivo separado.
- `arquivos/dicionario-excel.json`: pronúncia de termos técnicos.
- `modulos/`: área reservada às aulas completas.

## O que já funciona nesta versão
- Página responsiva com cinco pilares.
- Dez módulos com objetivos e tópicos iniciais.
- Laboratório interativo de controle de vendas.
- Download de exercício XLSX real.
- Narração via SpeechSynthesis do navegador.
- Quiz com correção e explicação.
- Registro de aulas e pontos em localStorage.
- Recomendação do próximo módulo.

## Limites conhecidos
- As aulas ainda são roteiros introdutórios, não cursos completos.
- A voz usa a síntese de fala do navegador; não está integrada ao motor Python/Edge TTS.
- O laboratório web é uma simulação, não uma instância do Excel.
- O progresso fica no navegador/dispositivo e não sincroniza entre aparelhos.
- Os certificados estão descritos, mas ainda não são emitidos.
- Compatibilidade de funções deve ser conferida por versão/build e idioma; não presumir que todos os recursos funcionam em todas as versões.
- Google Sheets não executa VBA diretamente.

## Preservação dos arquivos de voz
Coloque os arquivos originais enviados pelo usuário em `assets/` ou em uma pasta de integração separada. Não substitua o `dicionario.json` regional original: o vocabulário técnico do Excel fica separado.
