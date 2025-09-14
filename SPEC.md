# SPEC.md - フロントエンド技術実装要件

## 概要

TEE Edge Platform - セキュアなトレーディングボット実行のためのTEE（Trusted Execution Environment）ノードの貸借マーケットプレース。本文書はプラットフォームのフロントエンド技術仕様を定義する。

## 技術スタック

### コアフレームワーク

- **Next.js 15.5.3** with App Router
- **React 19.1.0**
- **TypeScript** strict mode
- **Tailwind CSS v4**
- **Biome** リンティング・フォーマット
- **Turbopack** 高速ビルド

### UIコンポーネント

- **shadcn/ui** メインコンポーネントライブラリ
- **ダークモード** デフォルトテーマ
- **レスポンシブデザイン** デスクトップ・モバイル対応

### Web3連携

- **wagmi** ウォレット接続・ブロックチェーン操作
- **viem** Ethereum低レベルライブラリ
- **RainbowKit** または類似のウォレット接続UI
- **Base ネットワーク** USDC取引（X402モック実装）

## ページ構成とルーティング

### パブリックルート

- **/** - ランディングページ
- **/nodes** - 利用可能TEEノード一覧
- **/programs** - プログラムマーケットプレース
- **/program/[id]** - 個別プログラム詳細

### 保護されたルート（ウォレット接続必須）

- **/dashboard** - ユーザーダッシュボード
- **/dashboard/nodes** - 自分のノード管理
- **/dashboard/jobs** - 実行履歴
- **/dashboard/programs** - 自分のプログラム
- **/user-program** - プログラム作成・実行
- **/nodes/new** - 新規TEEノード登録

## コンポーネント設計

### レイアウトコンポーネント

```typescript
// グローバルレイアウト（ウォレット接続付き）
app/layout.tsx
├── Header（ウォレット接続、ナビゲーション）
├── メインコンテンツエリア
└── Footer

// ダッシュボードレイアウト
app/dashboard/layout.tsx
├── サイドバーナビゲーション
├── メインダッシュボードコンテンツ
└── ステータスインジケーター
```

### 主要コンポーネント

#### ウォレット連携

```typescript
// components/wallet/
├── WalletButton.tsx          // ウォレット接続・切断
├── WalletStatus.tsx          // 接続アドレス表示
├── NetworkSelector.tsx       // Baseネットワーク切り替え
└── BalanceDisplay.tsx        // USDC残高表示
```

#### TEEノードコンポーネント

```typescript
// components/nodes/
├── NodeCard.tsx              // 個別ノード表示
├── NodeList.tsx              // 利用可能ノードグリッド
├── NodeRegistration.tsx      // 新規ノード登録フォーム
├── NodeMetrics.tsx           // パフォーマンス指標表示
└── AttestationStatus.tsx     // TEEアテステーション検証
```

#### プログラムコンポーネント

```typescript
// components/programs/
├── ProgramCard.tsx           // プログラムマーケットアイテム
├── ProgramDetails.tsx        // プログラム詳細表示
├── ProgramExecution.tsx      // プログラム実行インターフェース
├── ProgramUpload.tsx         // 新規プログラムアップロード
└── ExecutionHistory.tsx      // 過去の実行結果
```

#### 決済コンポーネント

```typescript
// components/payment/
├── X402PaymentModal.tsx      // 決済処理
├── PriceEstimator.tsx        // コスト計算
├── PaymentHistory.tsx        // 取引履歴
└── USDCTransfer.tsx          // Base USDC転送ロジック
```

## データモデルと型定義

### ノード型定義

```typescript
interface TEENode {
  id: string;
  name: string;
  description: string;
  owner: string; // ウォレットアドレス
  specifications: {
    cpu: string;
    memory: string;
    storage: string;
    teeType: 'SGX' | 'TrustZone' | 'SEV';
  };
  location: {
    region: string;
    city: string;
    latency: number; // 主要取引所への遅延（ms）
  };
  pricing: {
    perHour: number; // USDC時間単価
    perExecution: number; // USDC実行単価
  };
  availability: {
    status: 'online' | 'offline' | 'maintenance';
    uptime: number; // 稼働率（％）
    lastSeen: Date;
  };
  attestation: {
    verified: boolean;
    lastVerified: Date;
    certificate: string; // モック証明書
  };
  reputation: {
    rating: number; // 1-5星評価
    totalJobs: number;
    successRate: number;
  };
}
```

### プログラム型定義

```typescript
interface Program {
  id: string;
  name: string;
  description: string;
  author: string; // ウォレットアドレス
  category: 'arbitrage' | 'dex' | 'lending' | 'mev' | 'other';
  version: string;
  pricing: {
    basePrice: number; // 実行単価（USDC）
    revenueShare: number; // 利益配分率（％）
  };
  requirements: {
    minMemory: number;
    estimatedRuntime: number; // 推定実行時間（秒）
    supportedNodes: string[]; // サポートTEE種別
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    totalExecutions: number;
    averageRevenue: number;
  };
  code: {
    hash: string; // コンテンツハッシュ
    encrypted: boolean;
    size: number; // バイト数
  };
}
```

### ジョブ・実行型定義

```typescript
interface Job {
  id: string;
  programId: string;
  nodeId: string;
  user: string; // ウォレットアドレス
  status: 'pending' | 'running' | 'completed' | 'failed';
  parameters: Record<string, any>;
  execution: {
    startTime: Date;
    endTime?: Date;
    runtime?: number; // 実行時間（秒）
    logs?: string[];
    result?: any;
  };
  payment: {
    amount: number; // USDC
    txHash: string; // Baseネットワーク取引ハッシュ
    timestamp: Date;
  };
  attestation: {
    verified: boolean;
    proof: string; // モック証明
  };
}
```

## モックデータ実装

### モックデータソース

```typescript
// lib/mockData/
├── nodes.ts          // サンプルTEEノード
├── programs.ts       // サンプルトレーディングプログラム
├── jobs.ts           // 実行履歴
└── users.ts          // ユーザープロファイル
```

### モックサービス

```typescript
// lib/services/
├── mockNodeService.ts     // ノードCRUD操作
├── mockProgramService.ts  // プログラムマーケットプレース
├── mockJobService.ts      // ジョブ実行シミュレーション
├── mockPaymentService.ts  // X402/USDC転送シミュレーション
└── mockTEEService.ts      // TEEアテステーションモック
```

## 状態管理

### React Context グローバル状態

```typescript
// contexts/
├── WalletContext.tsx      // ウォレット接続状態
├── NodesContext.tsx       // 利用可能ノード
├── ProgramsContext.tsx    // プログラムマーケットプレース
└── JobsContext.tsx        // ユーザージョブと履歴
```

### React Hooks ローカル状態

- `useState` コンポーネントレベル状態
- `useEffect` データ取得・副作用処理
- `useCallback` と `useMemo` パフォーマンス最適化

## API連携（モック実装）

### モックAPIエンドポイント

```typescript
// setTimeout を使用したAPI呼び出しシミュレーション
GET    /api/nodes              // 利用可能ノード一覧
POST   /api/nodes              // 新規ノード登録
GET    /api/nodes/:id          // ノード詳細
PUT    /api/nodes/:id          // ノード更新

GET    /api/programs           // プログラム一覧
POST   /api/programs           // プログラムアップロード
GET    /api/programs/:id       // プログラム詳細

POST   /api/jobs               // 実行ジョブ作成
GET    /api/jobs               // ユーザーのジョブ履歴
GET    /api/jobs/:id           // ジョブ詳細

POST   /api/payments           // 決済処理
GET    /api/payments/history   // 決済履歴
```

## X402決済連携（モック）

### Base ネットワーク USDC転送

```typescript
// Base USDC転送を使用したモックX402実装
interface X402Payment {
  from: string;        // ユーザーウォレット
  to: string;          // ノードオーナーウォレット
  amount: number;      // USDC金額
  jobId: string;       // 関連ジョブ
  timestamp: Date;
}

// 決済フロー:
// 1. ユーザーのUSDC使用承認
// 2. ノードオーナーにUSDC転送
// 3. 取引ハッシュ記録
// 4. ジョブ決済ステータス更新
```

### 決済モーダルフロー

1. コスト見積もり表示
2. ウォレット残高表示
3. 必要に応じてUSDC承認要求
4. 転送取引実行
5. 決済完了確認
6. ジョブ実行開始

## TEEアテステーション（モック実装）

### モックアテステーションサービス

```typescript
interface AttestationResult {
  verified: boolean;
  timestamp: Date;
  nodeId: string;
  jobId: string;
  proof: string;        // モック暗号証明
  measurements: {
    codeHash: string;   // プログラム整合性
    envHash: string;    // 環境整合性
    inputHash: string;  // 入力パラメータハッシュ
  };
}

// モック検証プロセス:
// 1. ランダムなアテステーションデータ生成
// 2. 検証遅延シミュレーション（2-5秒）
// 3. モックルールに基づく成功・失敗返却
// 4. UI上で検証ステータス表示
```

## レスポンシブデザイン要件

### ブレークポイント（Tailwind CSS）

- **モバイル**: 320px - 767px
- **タブレット**: 768px - 1023px
- **デスクトップ**: 1024px+

### モバイル最適化

- 折り畳み式ナビゲーション
- タッチフレンドリーボタン（最小44px）
- 簡素化されたノード・プログラムカード
- 複雑なフォーム用モーダルダイアログ

## パフォーマンス要件

### Core Web Vitals ターゲット

- **LCP** (Largest Contentful Paint): < 2.5秒
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 最適化戦略

- Next.js Image コンポーネントで画像最適化
- 動的インポートによるコード分割
- 大きなリストの遅延読み込み
- 重い計算のメモ化

## セキュリティ考慮事項

### ウォレットセキュリティ

- 秘密鍵の保存禁止
- セキュアなウォレット接続ライブラリ使用
- 全ウォレット署名の検証
- 適切なCSRF保護実装

### データ検証

- 厳密なTypeScript型定義
- 全フォーム入力値検証
- ユーザー生成コンテンツのサニタイゼーション
- API呼び出しレート制限（シミュレート）

## 開発ワークフロー

### コード品質

- ESLint + Biome によるリンティング
- TypeScript strict mode
- フォーマットのプリコミットフック
- Jest/RTL によるコンポーネントテスト

### Git ワークフロー

- フィーチャーブランチ
- プルリクエストレビュー
- Conventional Commits
- Vercel 自動ビルド

## デプロイ設定

### 環境変数

```bash
NEXT_PUBLIC_BASE_CHAIN_ID=8453
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=xxx
NEXT_PUBLIC_ALCHEMY_API_KEY=xxx # 必要に応じて
NEXT_PUBLIC_APP_URL=https://tee-edge.vercel.app
```

### ビルド設定

- 出力: 分散ホスティング用静的エクスポート
- 画像最適化: 有効
- バンドルアナライザー: プロダクションビルドで有効

## テスト戦略

### ユニットテスト

- コンポーネントレンダリングテスト
- Hook機能テスト
- ユーティリティ関数テスト
- モックサービステスト

### 統合テスト

- ウォレット接続フロー
- 決済処理フロー
- ジョブ実行フロー
- ノード登録フロー

### E2Eテスト（オプション）

- 重要ユーザージャーニーでPlaywright使用
- ウォレット接続シミュレーション
- モック取引テスト

## 将来の機能拡張

### 実際の統合ポイント

- 実際のTEEノード通信
- 本格的なアテステーション検証
- プロダクションX402プロトコル
- バックエンドAPI統合
- リアルタイム更新用WebSocket

### 高度な機能

- 多言語サポート
- 高度な分析ダッシュボード
- ノードパフォーマンス監視
- 自動ジョブスケジューリング
- 評価システム改善