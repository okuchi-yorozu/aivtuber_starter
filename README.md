# 今回の目標

- AIVTuberを作る！
- 株主総会用の YouTube の情報を集めて MarkDown にまとめる

## 直近の目標

- [x] メッセージを送ったらAIVTuberがレスポンスを返してくれる
- [x] AIVTuberに短期記憶を作る
- [x] Live2Dモデルを画面に表示できる(Live2D-cubism)
- [x] 開発環境（Next.js）のルールを整える
  - [x] code formatter（Prettier、ESLint）を入れる
  - [x] IntelliJ IDEA でファイルを保存したときに自動でフォーマットする
- [ ] YouTube の APIを使って株主総会用の情報を取得する
- [ ] Live2Dモデルが喜怒哀楽で感情を表現する
- [ ] コラボ相手として配信に表示できる
- [ ] メッセージを音声入力できる(Whisper)
- [ ] レスポンスを音声出力できる(VOICEVOX)
- [ ] YouTubeのコメントの中からランダムで一つ選んで回答する
- [ ] AIが自分で考えてゲームを実況する
- [ ] AI助手くんの名前を考える

## 技術スタック

- Next.js
- TypeScript

## npm run

### import 文の並び替え

- npm run lint:fix

### prettier によるコードフォーマット

- npm run format

## コードフォーマットの手順

## 手順

### 1. Prettierプラグインのインストール

1. IntelliJ IDEAを開く。
2. メニューバーから `File` > `Settings` (または `Preferences` macOSの場合) を選択。
3. 左側のメニューから `Plugins` を選択。
4. 右上の検索バーで `Prettier` を検索し、`Install` をクリックしてインストール。

### 2. Prettierの設定

1. `Settings` (または `Preferences`) メニューに戻る。
2. 左側のメニューから `Languages & Frameworks` > `JavaScript` > `Prettier` を選択。
3. `Prettier package` フィールドに、プロジェクトにインストールされているPrettierのパスを指定します（通常は `node_modules/.bin/prettier`）。
4. `Configuration File` フィールドに、プロジェクトのPrettier設定ファイル（例： `.prettierrc`）のパスを指定します。

### 3. ファイル保存時に自動フォーマットを設定

1. `Settings` (または `Preferences`) メニューに戻る。
2. 左側のメニューから `Tools` > `Actions on Save` を選択。
3. `Actions on Save` のセクションで、`Prettier` チェックボックスをオンにします。

### 4. ファイルタイプの設定

1. `Settings` (または `Preferences`) メニューに戻る。
2. 左側のメニューから `Editor` > `File Types` を選択。
3. JavaScript、TypeScript、その他の関連ファイルタイプを確認し、これらのファイルタイプがPrettierによってフォーマットされるように設定します。

### 5. リアルタイムフォーマットのオプション

1. `Settings` (または `Preferences`) メニューに戻る。
2. 左側のメニューから `Editor` > `Code Style` を選択。
3. 右側のメニューから `JavaScript` または他の関連言語を選択。
4. 右下のセクションで `On typing` または `On editing` オプションを有効にします。

これで、IntelliJ IDEAでファイルを保存するたびに、またはリアルタイムでPrettierによるフォーマットが適用されるようになります。

## 自動化したいもの

適切なTypeScriptのコーディングルール（ESLint）
適切なコードフォーマット（Prettier）
importの並び順（lint:fix）
無効：アクセシビリティルール（ESLint）
Reactフックのルール（ESLint）
コードの品質と一貫性を保つためのカスタムルール（ESLint）
コードスタイルの統一（エディタ設定）
自動的な型チェック（TypeScript）
不要：コードセキュリティのルール（ESLint-plugin-security）
