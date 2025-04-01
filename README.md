# Testes Unitários com JEST

## GitHub Actions

[![Build and Tests](https://github.com/ugioni/unit-tests-jest/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/ugioni/unit-tests-jest/actions/workflows/node.js.yml)

## SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ugioni_unit-tests-jest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ugioni_unit-tests-jest)

## Introdução

Este projeto foi desenvolvido como parte da avaliação da disciplina de Automação de Testes. Para executá-lo, siga os passos abaixo:

1. Instale o [Node JS](https://nodejs.org/) (versão >= 20.x)
2. Execute `npm install` para instalar todas as dependências do projeto
3. Execute `npm run test` para rodar toda a suíte de testes
4. Execute `npm run coverage` para executar os testes com análise de cobertura

Os artefatos de execução serão gerados na pasta `./coverage`. Para limpar esses arquivos, execute `npm run clean`.

## Estrutura do Projeto

</br>
<ul>
    <li><strong>src</strong>: código-fonte da aplicação</li>
    <li><strong>test</strong>: arquivos de testes unitários</li>
</ul>