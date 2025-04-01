const AnaliseDeDados = require('../src/analiseDeDados');

describe('Testes da classe AnaliseDeDados', () => {
  let analise;

  beforeEach(() => {
    analise = new AnaliseDeDados([1, 2, 3, 4, 5]);
  });

  describe('Inicialização e manipulação básica', () => {
    test('Deve criar uma instância com dados iniciais', () => {
      expect(analise.dados).toEqual([1, 2, 3, 4, 5]);
    });

    test('Deve criar instância com array vazio quando nenhum dado for fornecido', () => {
      const analiseVazia = new AnaliseDeDados();
      expect(analiseVazia.dados).toEqual([]);
    });

    test('Deve adicionar novos dados corretamente', () => {
      analise.adicionarDados([6, 7]);
      expect(analise.dados).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('Deve lançar erro ao adicionar dados não-array', () => {
      expect(() => analise.adicionarDados("não é array")).toThrow("Os dados devem ser um array.");
    });

    test('Deve limpar os dados corretamente', () => {
      analise.limparDados();
      expect(analise.dados).toEqual([]);
    });

    test('Deve retornar dados ordenados', () => {
      analise.adicionarDados([0, -1]);
      expect(analise.ordenarDados()).toEqual([-1, 0, 1, 2, 3, 4, 5]);
    });
  });

  describe('Cálculos estatísticos básicos', () => {
    test('Deve calcular a média corretamente', () => {
      expect(analise.calcularMedia()).toBe(3);
    });

    test('Deve retornar null para média com dados vazios', () => {
      analise.limparDados();
      expect(analise.calcularMedia()).toBeNull();
    });

    test('Deve calcular a mediana para array ímpar', () => {
      expect(analise.calcularMediana()).toBe(3);
    });

    test('Deve calcular a mediana para array par', () => {
      analise.adicionarDados([6]);
      expect(analise.calcularMediana()).toBe(3.5);
    });

    test('Deve calcular a moda corretamente', () => {
      analise.adicionarDados([1, 1]);
      expect(analise.calcularModa()).toEqual([1]);
    });

    test('Deve retornar múltiplas modas quando existirem', () => {
      analise.limparDados();
      analise.adicionarDados([1, 2, 2, 3, 3]);
      expect(analise.calcularModa()).toEqual([2, 3]);
    });

    test('Deve calcular a variância corretamente', () => {
      expect(analise.calcularVariancia()).toBe(2);
    });

    test('Deve calcular o desvio padrão corretamente', () => {
      expect(analise.calcularDesvioPadrao()).toBe(Math.sqrt(2));
    });

    test('Deve retornar null para desvio padrão com dados vazios', () => {
      analise.limparDados();
      expect(analise.calcularDesvioPadrao()).toBeNull();
    });
  });

  describe('Valores extremos e normalização', () => {
    test('Deve encontrar o valor mínimo', () => {
      expect(analise.encontrarMinimo()).toBe(1);
    });

    test('Deve retornar null para mínimo com array vazio', () => {
      analise.limparDados();
      expect(analise.encontrarMinimo()).toBeNull();
    });

    test('Deve encontrar o valor máximo', () => {
      expect(analise.encontrarMaximo()).toBe(5);
    });

    test('Deve retornar null para máximo com array vazio', () => {
      analise.limparDados();
      expect(analise.encontrarMaximo()).toBeNull();
    });

    test('Deve normalizar os dados corretamente', () => {
      expect(analise.normalizarDados()).toEqual([0, 0.25, 0.5, 0.75, 1]);
    });

    test('Deve retornar zeros ao normalizar dados constantes', () => {
      analise.limparDados();
      analise.adicionarDados([5, 5, 5]);
      expect(analise.normalizarDados()).toEqual([0, 0, 0]);
    });

    test('Deve retornar array vazio ao normalizar dados vazios', () => {
      analise.limparDados();
      expect(analise.normalizarDados()).toEqual([]);
    });
  });

  describe('Percentis e operações matemáticas', () => {
    test('Deve calcular o percentil 25 corretamente', () => {
      expect(analise.calcularPercentil(25)).toBe(2);
    });

    test('Deve calcular percentis 0 e 100 corretamente', () => {
      expect(analise.calcularPercentil(0)).toBe(1);
      expect(analise.calcularPercentil(100)).toBe(5);
    });

    test('Deve retornar null para percentil inválido', () => {
      expect(analise.calcularPercentil(-10)).toBeNull();
      expect(analise.calcularPercentil(110)).toBeNull();
    });

    test('Deve retornar null para percentil com array vazio', () => {
      analise.limparDados();
      expect(analise.calcularPercentil(50)).toBeNull();
    });

    test('Deve calcular a soma corretamente', () => {
      expect(analise.calcularSoma()).toBe(15);
    });

    test('Deve calcular o produto corretamente', () => {
      expect(analise.calcularProduto()).toBe(120);
    });

    test('Deve retornar 1 para produto de array vazio', () => {
      analise.limparDados();
      expect(analise.calcularProduto()).toBe(1);
    });

    test('Deve calcular a amplitude corretamente', () => {
      expect(analise.calcularAmplitude()).toBe(4);
    });

    test('Deve retornar 0 para amplitude de array vazio', () => {
      analise.limparDados();
      expect(analise.calcularAmplitude()).toBe(0);
    });
  });

  describe('Coeficiente de variação e outliers', () => {
    test('Deve calcular o coeficiente de variação corretamente', () => {
      const coef = (Math.sqrt(2) / 3) * 100;
      expect(analise.calcularCoeficienteVariacao()).toBeCloseTo(coef);
    });

    test('Deve retornar NaN para coeficiente com array vazio', () => {
      analise.limparDados();
      expect(analise.calcularCoeficienteVariacao()).toBeNaN();
    });

    test('Deve remover outliers corretamente', () => {
      analise.adicionarDados([100, -100]);
      analise.removerOutliers();
      expect(analise.dados).toEqual([1, 2, 3, 4, 5]);
    });

    test('Deve remover outliers com fator customizado', () => {
      const analiseOutliers = new AnaliseDeDados([12, 12, 13, 12, 11, 13, 10, 10, 100]);
      analiseOutliers.removerOutliers(1.0);
      expect(analiseOutliers.dados).toEqual([12, 12, 13, 12, 11, 13, 10, 10]);
    });

    test('Deve lidar com remoção de outliers em array vazio', () => {
      analise.limparDados();
      expect(() => analise.removerOutliers()).not.toThrow();
      expect(analise.dados).toEqual([]);
    });
  });

  describe('Cálculo de correlação', () => {
    test('Deve calcular a correlação corretamente', () => {
      const outroConjunto = [2, 4, 6, 8, 10];
      expect(analise.calcularCorrelacao(outroConjunto)).toBeCloseTo(1);
    });

    test('Deve retornar null para conjuntos de tamanhos diferentes', () => {
      expect(analise.calcularCorrelacao([1, 2])).toBeNull();
    });

    test('Deve retornar null para correlação com arrays vazios', () => {
      analise.limparDados();
      expect(analise.calcularCorrelacao([])).toBeNull();
    });

    test('Deve retornar Null quando o denominador for zero', () => {
      const analiseConstante = new AnaliseDeDados([1, 1, 1, 1, 1]);
      const outroConstante = [1, 1, 1, 1, 1];
      expect(analiseConstante.calcularCorrelacao(outroConstante)).toBeNull();
    });
  });
});