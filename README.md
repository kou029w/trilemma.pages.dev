# trilemma.pages.dev

世界中のトリレンマを可視化するインタラクティブアトラス。

## デプロイ

```sh
bun install
bun run build
bunx wrangler pages deploy
```

Cloudflare ダッシュボードからリポジトリを接続する場合は Build command を `bun run build`、Output directory を `dist` に設定する。
