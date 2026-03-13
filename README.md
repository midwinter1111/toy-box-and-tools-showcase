# vue-asset-template

Vue 3 (Composition API) をベースとしたフロントエンド開発プロジェクトです。
Vite, Tailwind CSS v4, Storybook, Vitest などの最新スタックを利用しています。

## 📋 前提条件

開発を始める前に、以下のツールがインストールされていることを確認してください。

* **IDE**: [Visual Studio Code](https://code.visualstudio.com/)
* **Node.js 管理**: [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
* **パッケージマネージャー**: [pnpm](https://pnpm.io/ja/installation) (v10.30.3 推奨)

## 🛠️ 環境構築手順

リポジトリをクローンした後、以下の手順でセットアップを行ってください。

### 1. Node.js バージョンの切り替え

本プロジェクトは `.node-version` に指定されたバージョン、または `package.json` の `engines` に準拠したバージョンを利用します。

```powershell
# .node-version の内容を確認してインストール（初回のみ）
nvm install $(Get-Content .node-version)

# 指定バージョンに切り替え
nvm use $(Get-Content .node-version)
```

### 2. pnpm の有効化と実行ポリシーの設定

pnpmコマンドが実行できない場合は、管理者権限のPowerShellで実行ポリシーを変更してください。

```powershell
# 実行ポリシーの変更（初回のみ）
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Corepackを有効にしてpnpmを準備
corepack enable
```

### 3. 依存関係のインストール

pnpm-lock.yaml に基づき、バージョンを固定してインストールを行います。

```powershell
pnpm run ci
```

## 🚀 利用可能なコマンド

|コマンド|内容|備考|
|---|---|---|
|pnpm start|開発用サーバの起動|localhost:3000 (MSW有効モード)|
|pnpm run dev|Vite標準の開発サーバ起動|localhost:3000|
|pnpm run ci|依存関係のクリーンインストール|pnpm i --frozen-lockfile|
|pnpm run build|本番用リソースのビルド|/dist フォルダに出力|
|pnpm run test|Vitest UIを起動してテスト実行|カバレッジ計測・ブラウザ自動起動|
|pnpm run test:ci|CI環境用テスト実行|全テストケースを一括検証|
|pnpm run storybook|Storybook の起動|localhost:6006|
|pnpm run lint|コードの静的解析 (oxlint/eslint)|自動修正を試行|
|pnpm run format|コードフォーマット (oxfmt)|src/ 配下が対象|

## 🏗️ 技術スタック

Framework: Vue 3.5+ (Script Setup)

Build Tool: Vite

Store: Pinia

Routing: Vue Router

HTTP Client: Axios

Mock: MSW (Mock Service Worker)

Styling: Tailwind CSS v4

Testing: Vitest (UI, Browser Mode, Coverage)

Design/Dev: Storybook, Vue DevTools

Lint/Format: ESLint, Oxlint, Oxfmt
