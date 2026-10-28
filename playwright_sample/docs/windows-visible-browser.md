# Windows で Playwright のブラウザ操作を見る

Codex の指示による操作を画面で追うには、Playwright を表示付きで起動する。Windows 上で完結させる方法が手軽。WSL やコンテナを使う場合は画面の接続設定が必要になる。

## Windows で直接実行

1. Windows に Node.js と Codex を用意し、このリポジトリを取得する。
2. Windows の PowerShell で `playwright_sample` に移動し、次を実行する。

   ```powershell
   npm ci
   npx playwright install chromium
   npm run codegen
   ```

3. ブラウザと Playwright Inspector が表示されることを確認する。`codegen` は手動操作を記録するためのコマンド。
4. 同じ Windows 環境で Codex を起動し、「表示付きブラウザで TodoMVC を開き、操作して」と指示する。Codex が実行する Playwright では `headless: false` を指定する。

Codex がコンテナ内で動いている場合、Windows 側のブラウザを自動的に操作できるわけではない。別途ブラウザへの接続設定が必要。

## WSL 2 で実行

Windows 11 と WSL 2 の GUI 機能（WSLg）を使う例。Windows の PowerShell で `wsl --version` と `wsl --list --verbose` を実行し、WSL とディストリビューションが WSL 2 で動いていることを確認する。未導入の場合は管理者 PowerShell で `wsl --install` を実行する。詳細は [Microsoft の WSL GUI アプリの手順](https://learn.microsoft.com/windows/wsl/tutorials/gui-apps)を参照。

WSL のターミナルで `echo "$DISPLAY"` を実行し、通常 `:0` が設定されていることを確認する。WSL 内に Node.js、プロジェクト、依存関係と Chromium を用意し、プロジェクトの `playwright_sample` で次を実行する。

```bash
npm ci
npx playwright install chromium
npm run codegen
```

Codex も同じ WSL 環境で実行し、表示付きで操作するよう指示する。WSL 内のブラウザは Windows に表示される。

### WSL + 開発コンテナの場合

コンテナには WSLg の画面接続を別途渡す必要がある。Docker Desktop の WSL 2 エンジンと対象ディストリビューションの WSL Integration を有効にする（[Docker の手順](https://docs.docker.com/desktop/features/wsl/use-wsl/)）。Dev Container の設定例は次のとおり。

```json
{
  "containerEnv": { "DISPLAY": ":0" },
  "mounts": [
    "source=/tmp/.X11-unix,target=/tmp/.X11-unix,type=bind",
    "source=/mnt/wslg,target=/mnt/wslg,type=bind"
  ]
}
```

既存の `.devcontainer/devcontainer.json` に項目を追加してコンテナを再作成する。**このコンテナ構成は未検証**。Docker のマウント元の解決方法や WSLg の設定によって追加の調整が必要な場合がある。コンテナ内で `echo "$DISPLAY"` と `ls -la /tmp/.X11-unix` を確認し、`npm run codegen` で表示を試す。

`Missing X server or $DISPLAY` が出る場合は、表示先が設定されていないか接続できていない。Xvfb だけでは Windows にウィンドウは表示されない。
