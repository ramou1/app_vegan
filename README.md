# veggie

Rede social para o público vegetariano e vegano.

Esta é a segunda versão do app — refeita em **Ionic 7**, **Angular 17** e **Capacitor 5** [(original em Ionic 1, 2017)](https://github.com/ramou1/vegan), para o Trabalho de Graduação do curso de Análise e Desenvolvimento de Sistemas.

## Stack

| Tecnologia | Versão |
|---|---|
| Ionic Angular | 7.x |
| Angular | 17.x |
| Capacitor | 5.x |
| Ionicons | 7.x |
| Swiper | 11.x |

## Download

Baixe a última versão apk do projeto [aqui.](https://github.com/ramou1/app_vegan/raw/main/versions/app-vegan.apk)

## Como rodar

Pré-requisito: **Node.js 18 ou 20**.

```bash
npm install
npm start
```

Abra [http://localhost:4200](http://localhost:4200).

Alternativa com Ionic CLI:

```bash
npm install -g @ionic/cli
ionic serve
```

O app usa dados mockados (sem backend). No login, os campos já vêm preenchidos (`user` / `123456789`).

### Android (opcional)

```bash
npm run build
npx cap sync android
npx cap open android
```

## Eventos e organizações

### Eventos

- A listagem em **eventos** filtra pelo **título** no campo de busca.
- Cada card mostra imagem, badge de data, título, local, categoria e miniaturas de quem confirmou presença (sem botão “quero ir” no card).
- Ao tocar em um evento, abre a rota com id:  
  `/main/events/event-details/:id`  
  (ex.: `/main/events/event-details/101`). O link pode ser copiado pelo menu `⋯` ou pelo botão de compartilhar nos detalhes.
- A tela de detalhes inclui:
  - calendário com dia da semana
  - miniaturas de quem vai (abre modal com a lista)
  - seção **sobre** (descrição)
  - seção **detalhes** (data, localização escrita e miniatura do mapa)
  - seção **criado por** (organização e membros)
  - ação de confirmar presença no rodapé

### Organizações

- Todo evento pertence a uma **organização**.
- Só é possível **criar um evento** se o usuário logado tiver (ou criar) uma organização.
- Organizações mockadas: `fgv veg`, `irani green`, `vokin collective`.
- O usuário de login (Lucas) já possui a organização **russell vegan club** para testar a criação de eventos.
- Criar organização:
  - pelo FAB de eventos (alert “organização necessária”)
  - na tela **novo evento**
  - em **editar perfil → organizações**
- Rota da tela: `/main/events/new-organization`

Serviços: `OrganizationService` e `EventService` (dados em `src/app/constants/mock.const.ts`).

## O que o app faz (ou vai fazer um dia)?

:herb: acesse a timeline com as postagens mais recentes dos seus amigos;  
:herb: comente ou curta as postagens dos seus amigos;  
:herb: publique e encontre eventos vegetarianos e veganos na sua região;  
:herb: marque presença, curta e compartilhe os eventos;  
:herb: publique, encontre, comente ou curta receitas;  
:herb: encontre restaurantes vegetarianos e veganos próximos com informações de horário de funcionamento e cardápio;  
:herb: crie, edite e acesse seu perfil pessoal;  
:herb: crie organizações e associe eventos a elas;  
:herb: pesquise e adicione amigos e conheça novas pessoas para compartilhar experiências e conhecimento.

## Ideias de nome

VeggieVision, GreenHub, VivaVeg, VeggieVerse, VegiFly.

## Imagem do app (antiga)

![text](https://i.imgur.com/DZSMvQQ.jpg)
