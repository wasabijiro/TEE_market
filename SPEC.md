# TEE Edge Platform

## 課題

### クラウドで動かす場合

- 開発者や運営者に秘密鍵や取引戦略を渡す必要があり、情報漏洩や悪用のリスクがある
- Bot提供者の主張を利用者が検証できず、安全性が不透明
- 取引API事業者のサーバー近くで環境を確保するのが難しい
- 常にTEEノードを動かすと高額コストになる

### ローカルで動かす場合

- TEE対応ハードウェアを自前で購入する必要がある
- ネットワークや電源の安定性が保証されず、高可用性を確保しにくい
- 取引API事業者のサーバーから遠く、レイテンシ面で不利

## 解決策: TEE Node市場の構築

- 一般ユーザーが保有するTEEノードを貸し出せるプラットフォームを提供
- 取引Botを動かしたいユーザーは利用料を支払い、適切なノードを選択
- ノード利用価格は以下で決定
    - 実行時間
    - システムの安定稼働実績
    - 取引API事業者のサーバーとの距離
    - 実行時間を短縮できる戦略（キャッシュ・スケジューリング等）の有効性

### 利用者のメリット

- BotはTEE内で実行され、クラウド運営者にも戦略は不可視
- API事業者に近いノードを選べるため、取引レイテンシで有利
- ローカルより安定した環境を利用可能
- スポット利用（function実行型）により、常時稼働よりコスト削減

### ノード提供者のメリット

- TEEノードを貸し出すだけで利益を得られる
    - リソースの小口販売
- 稼働実績や立地条件に応じて利用率が上がり、収益化できる

### Bot提供者のメリット

- 余計な常駐コストが必要ない
- 過剰課金を防げつ
- Bot戦略もTEE内で実行され、クラウド運営者から不可視
    - 結果にあてステーションを添付し、Botter自身が約束通りの環境で動いたと検証可能

低遅延×機密性×検証可能性

## プラットフォーム設計

### コンセプト
取引Botの実績とTEE実行の透明性を重視したマーケットプレイス。HyperliquidのVaultやBybitのCopyTradeのようなリッチなUIで、Bot選択からTEEノードでの実行まで、シームレスな体験を提供。

### 主要機能
1. **Bot マーケットプレイス**
   - Bot一覧表示（パフォーマンス、APR、ROI、実行回数等）
   - TEEアテステーション結果の表示

2. **TEE Node 選択**
   - 利用可能なノード一覧
   - レイテンシ（取引所からの距離）表示
   - 稼働率・信頼性スコア
   - 価格（USDC/実行時間）

3. **決済システム**
   - x402プロトコルによるBase上のUSDC決済
   - 実行時間ベースの課金
   - 透明な料金体系

## ユーザーフロー

### Bot実行フロー
1. **Bot選択**
   - マーケットプレイスでBotを閲覧
   - パフォーマンス指標を確認
   - Bot詳細ページでアテステーション履歴を確認

2. **Node選択**
   - 推奨ノードの表示（レイテンシ最適化）
   - ノードの稼働状況確認
   - 料金見積もり

3. **支払い＆実行**
   - x402でUSDC支払い
   - TEEでのBot実行開始
   - リアルタイム実行状況モニタリング

4. **結果確認**
   - 実行結果とアテステーション
   - パフォーマンスレポート
   - 取引履歴

## 技術アーキテクチャ

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Tailwind CSS v4
- **State Management**: React Context / Zustand
- **Web3 Integration**: wagmi / viem

### Backend Services
- **API**: Next.js API Routes (Mock データ用)
- **Data**: ローカル JSON/TypeScript オブジェクト (ハッカソン用)

### Web3 Components
- **Payment**: x402 Protocol Integration
- **Chain**: Base (Ethereum L2)
- **Token**: USDC

### TEE Integration
- **Attestation**: Mock API (開発段階)
- **Node Communication**: WebSocket

## データモデル

### Bot
```typescript
interface Bot {
  id: string
  name: string
  description: string
  strategy: string
  createdBy: string
  performance: {
    apy: number
    roi: number
    winRate: number
    totalTrades: number
    profitLoss: number
  }
  riskLevel: 'low' | 'medium' | 'high'
  minInvestment: number
  attestations: Attestation[]
}
```

### TEENode
```typescript
interface TEENode {
  id: string
  provider: string
  location: string
  latency: {
    [exchange: string]: number // ms
  }
  pricing: {
    baseRate: number // USDC per hour
    spotRate: number // USDC per execution
  }
  uptime: number // percentage
  trustScore: number
  capacity: {
    current: number
    max: number
  }
}
```

### Transaction
```typescript
interface Transaction {
  id: string
  userId: string
  botId: string
  nodeId: string
  amount: number // USDC
  duration: number // seconds
  status: 'pending' | 'executing' | 'completed' | 'failed'
  txHash: string // x402 transaction
  executionResult?: any
  attestation?: Attestation
}
```

### Attestation
```typescript
interface Attestation {
  id: string
  botId: string
  nodeId: string
  timestamp: number
  executionHash: string
  teeProof: string // Mock for now
  performance: {
    trades: number
    profit: number
    executionTime: number
  }
}
```

## x402 決済フロー詳細

### 概要
x402プロトコルを使用したBase上のUSDC決済フロー。HTTP 402ステータスコードを活用した、シンプルで透明性の高い支払いシステム。

### 決済フロー

1. **支払い要求の生成**
   - ユーザーが"Run Bot with TEE"ボタンをクリック
   - フロントエンドが以下のデータを含む支払いリクエストを構築:
     ```typescript
     {
       botId: string,
       nodeId: string,
       estimatedDuration: number, // seconds
       pricePerExecution: number, // USDC
       totalAmount: number, // USDC
       recipientAddress: string, // Node provider's address
       chainId: 8453, // Base
       tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // USDC on Base
     }
     ```

2. **ウォレット接続確認**
   - ウォレット未接続の場合: 接続モーダル表示
   - 接続済みの場合: 残高確認
   - 残高不足の場合: エラー表示

3. **支払いトランザクション**
   - wagmi/viemを使用してUSDC転送トランザクションを作成
   - ユーザーのウォレット（MetaMask等）で承認
   - トランザクション送信

4. **支払い確認**
   - トランザクションハッシュ取得
   - ブロックチェーン上で確認待ち（スピナー表示）
   - 確認完了後、実行フェーズへ移行

5. **実行開始**
   - 支払い証明（txHash）を含めてBot実行リクエスト
   - Mock APIが実行状態をシミュレート
   - リアルタイムログ表示

### エラーハンドリング
- **残高不足**: "Insufficient USDC balance"メッセージ
- **トランザクション失敗**: "Transaction failed"と再試行ボタン
- **ネットワークエラー**: "Network error"と自動リトライ

### UI表示要素
- 支払い前: 料金見積もり、必要USDC額
- 支払い中: トランザクション承認待ち、確認待ちスピナー
- 支払い後: トランザクションリンク、実行ステータス

## UI/UXデザイン

### デザインシステム
- **カラーパレット**: ダークテーマベース（プロフェッショナルな取引環境）
- **タイポグラフィ**: 数値の視認性を重視
- **コンポーネント**: カード型UI、データビジュアライゼーション

### 主要画面

#### 1. Bot一覧画面 (`/`)
**レイアウト**: グリッドレイアウト（3列×n行、レスポンシブ対応）

**ヘッダーセクション**:
- タイトル: "TEE-Verified Trading Bots"
- サブタイトル: "全てのパフォーマンスはTEEで検証済み"
- ウォレット接続ボタン（右上）


**Botカードコンポーネント**:
```
┌─────────────────────────────┐
│ [戦略タイプ]    [リスクレベル]│
│                             │
│ Bot Name                    │
│ by 0x1234...5678           │
│                             │
│ ┌─────────┬────────────┐   │
│ │ APR     │ 125.5%     │   │
│ ├─────────┼────────────┤   │
│ │ ROI     │ 45.2%      │   │
│ ├─────────┼────────────┤   │
│ │ Win Rate│ 78.5%      │   │
│ └─────────┴────────────┘   │
│                             │
│ 🔐 TEE Verified ✓           │
│ Min: 1,000 USDC            │
│                             │
│ [詳細を見る]                │
└─────────────────────────────┘
```

**表示データ（Botインターフェースより）**:
- `name`, `createdBy`（短縮表示）
- `performance.apy`, `performance.roi`, `performance.winRate`
- `strategy`, `riskLevel`
- `minInvestment`
- TEE検証バッジ（attestationsが存在する場合）

#### 2. Bot詳細・実行画面 (`/bot/[id]`)
**レイアウト**: 2カラムレイアウト（左: Bot情報、右: 実行セクション）

**左カラム - Bot情報**:
- Bot名、作成者、説明文
- パフォーマンスチャート（ラインチャート、過去30日間）
- 詳細統計:
  - 総利益/損失
  - 総取引回数  
  - 平均保有時間
  - 最大ドローダウン
- TEEアテステーション履歴（タイムライン形式）:
  ```
  [timestamp] Node: Tokyo-1
  実行時間: 120s | 取引: 45 | 利益: +234.5 USDC
  [View Proof]
  ```

**右カラム - 実行セクション**:
1. **Node選択エリア**:
   - 推奨ノード表示（レイテンシベース）
   - ノードリスト（カード形式）:
     ```
     ┌─────────────────────────┐
     │ Singapore Hub           │
     │ 📍 Singapore           │
     │ ⚡ 4ms (Bybit)         │
     │ 💰 0.013 USDC/exec     │
     │ 📊 99.8% uptime        │
     │ [選択]                  │
     └─────────────────────────┘
     ```
   
2. **料金見積もり**:
   - 選択したNodeの料金
   - 予想実行時間
   - 合計費用（USDC）

3. **実行ボタン**:
   - "Run Bot with TEE" ボタン（大きく目立つ）
   - 必要USDC残高チェック表示

**実行後の状態表示**:
- プログレスバー付きモーダル
- リアルタイム風のログ表示:
  ```
  [12:34:56] Initializing TEE environment...
  [12:34:57] Loading bot strategy...
  [12:34:58] Connecting to Bybit API...
  [12:35:02] Executing trades...
  [12:35:45] Generating attestation...
  ```
- 完了後: 結果サマリー、トランザクションリンク

#### 3. 実行履歴画面（オプション）
**レイアウト**: テーブル形式

**表示項目**:
- 実行日時
- Bot名
- 使用Node
- 実行時間
- 取引数
- 損益
- ステータス
- アテステーションリンク