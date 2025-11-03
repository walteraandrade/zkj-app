# ZKJ - Controle de Qualidade

App mobile para gerenciamento de haras e controle de qualidade de criação de cavalos.

## Características

- ✅ Cadastro completo de cavalos (informações pessoais, filiação, nascimento)
- ✅ Histórico de acasalamentos para fêmeas
- ✅ Armazenamento local com SQLite (Expo SQLite)
- ✅ Importação e exportação de dados em JSON
- ✅ Interface mobile otimizada com React Native
- ✅ Navegação intuitiva

## Tecnologias

- React Native com Expo
- Expo SQLite (armazenamento local)
- React Navigation (navegação)
- TypeScript
- Expo Image Picker (fotos)
- Expo Document Picker (importação de arquivos)
- Expo File System & Sharing (exportação de arquivos)

## Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Expo CLI instalado globalmente: `npm install -g expo-cli`
- iOS: Xcode (apenas macOS)
- Android: Android Studio

## Instalação

1. Instalar dependências:
```bash
npm install
```

ou com yarn:
```bash
yarn install
```

2. Iniciar o projeto:
```bash
npm start
```

3. Escanear o QR code com o app Expo Go no seu celular, ou:
   - Pressione `i` para iOS simulator
   - Pressione `a` para Android emulator

## Estrutura do Projeto

```
├── app.json              # Configuração do Expo
├── App.tsx               # Componente raiz com navegação
├── index.tsx             # Entry point
├── types.ts              # Tipos TypeScript
├── components/           # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── HorseList.tsx
│   ├── HorseCard.tsx
│   ├── HorseDetail.tsx
│   ├── HorseForm.tsx
│   ├── MatingForm.tsx
│   ├── FloatingActionButton.tsx
│   └── Icons.tsx
├── screens/              # Telas (navegação)
│   ├── HorseListScreen.tsx
│   ├── HorseDetailScreen.tsx
│   ├── HorseFormScreen.tsx
│   └── MatingFormScreen.tsx
├── hooks/                # Custom hooks
│   ├── useExpoStorage.ts # Hook de armazenamento SQLite
│   └── useLocalStorage.ts# Hook antigo (web)
├── navigation/           # Configuração de navegação
│   └── AppNavigator.tsx
└── utils/                # Utilitários
    ├── imageUtils.ts     # Manipulação de imagens
    ├── exportUtils.ts    # Exportação de dados
    └── importUtils.ts    # Importação de dados
```

## Build para Produção

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Ou usar EAS Build (recomendado):
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Desenvolvimento

O app foi migrado de uma aplicação web React (Vite + IndexedDB) para React Native Expo mantendo toda funcionalidade:

- IndexedDB → Expo SQLite
- HTML components → React Native components
- TailwindCSS → StyleSheet
- React Router → React Navigation
- HTML5 File APIs → Expo File System APIs

## Licença

MIT
