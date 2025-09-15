# Two-Server Architecture with HTTP-to-vsock Proxy

このプロジェクトは、HTTPとvsock通信を使用した2サーバーアーキテクチャを実装しています。

## アーキテクチャ

```
Client --(HTTP)--> Server1 --(vsock)--> Server2
                     ^                      |
                     |                      |
                     +-------(vsock)--------+
```

- **Client**: HTTPリクエストを送信
- **Server1**: HTTPサーバー（Flask）、vsockプロキシとして動作
- **Server2**: vsockバックエンドサーバー、リクエストを処理

## セットアップ

1. 仮想環境の作成と有効化:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. 依存関係のインストール:
```bash
pip install -r requirements.txt
```

## 実行方法

### TCPモードでのテスト（開発用）

```bash
# Server2を起動（TCPモード、ポート9001）
python server2.py --tcp --port 9001

# Server1を起動（HTTPポート5000、Server2へTCP接続）
python server1.py --tcp --server2-port 9001

# クライアントでテスト
python client.py
```

または、テストスクリプトを使用:
```bash
./test_tcp.sh
```

### vsockモードでの実行（本番環境）

```bash
# Server2を起動（vsockモード）
python server2.py --port 9001

# Server1を起動（Server2のCIDを指定）
python server1.py --server2-cid <CID> --server2-port 9001

# クライアントでテスト
python client.py
```

## APIエンドポイント

- `GET /` - Server2からの基本的な応答
- `GET /health` - Server1のヘルスチェック
- `POST /echo` - リクエストデータをエコーバック
- `GET|POST /<path>` - 任意のパスをServer2に転送

## クライアント使用例

```bash
# GETリクエスト
python client.py

# POSTリクエスト
python client.py --method POST --path /echo --data "Hello World"

# カスタムパス
python client.py --path /custom/endpoint
```

## コマンドラインオプション

### server1.py
- `--http-port`: HTTPリスニングポート（デフォルト: 5000）
- `--tcp`: TCPソケットを使用（vsockの代わり）
- `--server2-cid`: Server2のCID（vsockモード時）
- `--server2-host`: Server2のホスト（TCPモード時、デフォルト: localhost）
- `--server2-port`: Server2のポート（デフォルト: 9001）
****
### server2.py
- `--port`: リスニングポート（デフォルト: 9001）
- `--tcp`: TCPソケットを使用（vsockの代わり）

### client.py
- `--server`: Server1のホスト（デフォルト: localhost）
- `--port`: Server1のポート（デフォルト: 5000）
- `--path`: リクエストパス（デフォルト: /）
- `--method`: HTTPメソッド（GET/POST、デフォルト: GET）
- `--data`: POSTリクエスト用データ
