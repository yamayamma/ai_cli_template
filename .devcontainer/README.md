# Copilot CLI Development Container

GitHub Copilot CLI を使用した開発環境です。

## 機能

- **Ubuntu 22.04** ベースイメージ
- **GitHub CLI (gh)** - 最新版がプリインストール
- **GitHub Copilot CLI** - 自動セットアップ
- **Zsh + Oh My Zsh** - モダンなシェル環境
- **VS Code 拡張機能** - Copilot 関連の拡張機能が自動インストール

## セットアップ

### 1. 前提条件

- Docker Desktop または Docker Engine
- VS Code + Dev Containers 拡張機能
- GitHub Copilot のサブスクリプション（Individual, Business, または Enterprise）

### 2. 起動方法

1. VS Code でこのフォルダを開く
2. コマンドパレット (F1) → "Dev Containers: Reopen in Container"
3. コンテナのビルドを待つ

### 3. GitHub 認証

コンテナ起動後、以下のコマンドで認証：

```bash
gh auth login
```

認証フロー:

1. `GitHub.com` を選択
2. `HTTPS` を選択
3. `Y` で認証
4. `Login with a web browser` を選択
5. ブラウザでコードを入力して認証

### 4. Copilot CLI の使用

```bash
# コマンドの提案を受ける
gh copilot suggest "find all files larger than 100MB"

# コマンドの説明を受ける
gh copilot explain "tar -czvf archive.tar.gz folder/"

# エイリアス（オプション）
alias '??'='gh copilot suggest'
alias 'explain'='gh copilot explain'
```

## ホスト環境との連携

### GitHub 認証情報の共有

`devcontainer.json`の`mounts`設定により、ホストの`~/.config/gh`がコンテナにマウントされます。
これにより、ホストで認証済みの場合は再認証不要です。

マウントが不要な場合は、`devcontainer.json`から該当行を削除してください：

```json
"mounts": [
  "source=${localEnv:HOME}/.config/gh,target=/home/vscode/.config/gh,type=bind,consistency=cached"
]
```

## トラブルシューティング

### Copilot CLI 拡張機能がインストールできない

```bash
# 手動でインストール
gh extension install github/gh-copilot

# 権限エラーの場合、再認証
gh auth refresh -s copilot
```

### 認証エラー

```bash
# 認証状態の確認
gh auth status

# 再認証
gh auth logout
gh auth login
```

### 拡張機能の更新

```bash
gh extension upgrade github/gh-copilot
```

## Copilot CLI コマンド一覧

| コマンド             | 説明                             |
| -------------------- | -------------------------------- |
| `gh copilot suggest` | 自然言語からシェルコマンドを提案 |
| `gh copilot explain` | コマンドの詳細な説明を表示       |
| `gh copilot alias`   | シェルエイリアスの設定           |
| `gh copilot config`  | 設定の表示・変更                 |

## 参考リンク

- [GitHub Copilot CLI Documentation](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Dev Containers Documentation](https://containers.dev/)
