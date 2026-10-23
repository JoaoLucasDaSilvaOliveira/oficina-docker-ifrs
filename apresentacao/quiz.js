window.OFICINA_QUIZ = [
  {
    question:
      "Você executou stop e start no mesmo container. Um arquivo em /tmp, sem mount, ainda existe?",
    answers: [
      "Sim, a camada gravável continua no mesmo container.",
      "Não, stop apaga o filesystem.",
      "Só depois de um push ao Hub.",
    ],
    correct: 0,
    explanation:
      "Parar não é remover. A camada gravável pertence ao container.",
  },
  {
    question: "O que conecta a pasta pessoal do host a /host-home na IDE?",
    answers: ["EXPOSE.", "Um bind mount.", "A tag latest."],
    correct: 1,
    explanation:
      "Bind mount conecta um caminho específico do host ao container.",
  },
  {
    question:
      "A API acessa o PostgreSQL de outro container da mesma rede. Qual endereço usa?",
    answers: ["localhost:5432", "127.0.0.1:8088", "db:5432"],
    correct: 2,
    explanation:
      "db é resolvido pelo DNS da rede Compose. localhost na API aponta para ela mesma.",
  },
  {
    question: "EXPOSE 8080 publica automaticamente essa porta no host?",
    answers: [
      "Sim, em qualquer imagem.",
      "Não. Use ports ou -p.",
      "Somente quando existe volume.",
    ],
    correct: 1,
    explanation: "EXPOSE documenta. Publicação é configuração de execução.",
  },
  {
    question: "O que docker push da imagem da API envia?",
    answers: [
      "A imagem e sua configuração.",
      "Os recados do volume do banco.",
      "O filesystem do host.",
    ],
    correct: 0,
    explanation: "Volumes e configurações locais são recursos separados.",
  },
  {
    question:
      "A IDE foi iniciada por exec, com sleep infinity como processo principal. Ao fechar a janela…",
    answers: [
      "os volumes são apagados.",
      "o Docker Engine encerra.",
      "o processo principal pode manter o container em execução.",
    ],
    correct: 2,
    explanation:
      "O término da IDE não encerra automaticamente um processo principal independente.",
  },
];
