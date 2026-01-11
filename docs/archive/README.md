# Documentation Archive

このディレクトリには、PR作成時にアーカイブされた作業ドキュメントが保存されます。

## アーカイブポリシー

Constitution V原則「Documentation Through Tests」に従い：

- **テストコード**: 唯一の生きたドキュメント（アーカイブしない）
- **作業文書**: PR mergeのタイミングでここにアーカイブ
- **README**: セットアップ・使用方法のみ（常に最新を維持）

## ディレクトリ構造

```
archive/
└── YYYY-MM-DD-feature-name/
    ├── design-notes.md
    ├── discussion.md
    ├── research.md
    └── decisions.md
```

## アーカイブ時期

- PR作成時
- 機能実装完了時
- ドキュメントが「完了した作業」を記述している場合

## アーカイブしないもの

- `README.md` - 常に最新を維持
- `constitution.md` - 生きた原則
- テストコード - 実行可能な仕様書
- API仕様（contracts/） - アクティブな契約
