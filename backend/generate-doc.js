const fs = require('fs');
const path = require('path');

// Função para gerar o conteúdo markdown
const generateMarkdown = (directoryPath) => {
  let markdownContent = `# Estrutura da Pasta \`src\`\n\n`;

  // Função recursiva para percorrer a pasta e gerar markdown
  const readDirectory = (dir, prefix = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach((item) => {
      const itemPath = path.join(dir, item.name);
      const relativePath = path.relative(directoryPath, itemPath);

      if (item.isDirectory()) {
        markdownContent += `\n## Pasta: \`${relativePath}\`\n\n`;
        readDirectory(itemPath, prefix + '  ');
      } else if (item.isFile()) {
        markdownContent += `\n### Arquivo: \`${relativePath}\`\n\n\`\`\`js\n`;
        const fileContent = fs.readFileSync(itemPath, 'utf-8');
        markdownContent += `${fileContent.substring(0, 300)}\n...\n\`\`\`\n`;
      }
    });
  };

  readDirectory(directoryPath);

  return markdownContent;
};

// Função para criar o arquivo doc.md na raiz do projeto
const createMarkdownFile = (directoryPath) => {
  const markdown = generateMarkdown(directoryPath);
  const outputPath = path.join(__dirname, 'doc.md');
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log('Arquivo doc.md criado na raiz do projeto!');
};

// Diretório alvo (/src)
const srcDirectory = path.join(__dirname, 'src');

// Gera o markdown para a pasta /src
createMarkdownFile(srcDirectory);
