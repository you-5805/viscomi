## ポートフォリオ・スキル確認として閲覧いただく場合
お忙しい中、当リポジトリにアクセスしていただき、ありがとうございます。  
機能や使用技術等につきましては、READMEを読んでいただくのがスムーズかと思います。  

VISCOMI：https://viscomi.herokuapp.com  

ワイヤーフレーム：https://whimsical.com/viscomi-XyMUuw9htGAWUG95cvFqLR

### ログイン
1. [リンク](https://viscomi.herokuapp.com)
からトップページへ
2. 「ログイン」ボタンをClick
3. 公民館ユーザー、一般ユーザーを選び、ボタンをClickでログイン情報自動入力
4. 「ログイン」をClick
5. サイドバーの「マイページ」または「VISCOMI」のロゴをClickすることで登録している公民館のタイムラインを閲覧できます。

### 投稿作成
1. ログイン時に「公民館ユーザー」としてログイン
2. サイドバーの「投稿を作成」をClick
3. タイトル、本文、添付画像を選択して、「作成」をClick

### 広告作成
1. ログイン時に「公民館ユーザー」としてログイン
2. サイドバーの「広告を作成」をClick
3. 登録公民館、店舗名、本文、電話番号、URLの必須情報を入力し、「登録」をClick
4. 連続作成を想定して同ページでリロードしますが、マイページまたは管理者ページから、「広告」タブに登録されていることが確認できます。

### メール送信
1. ログイン時に「公民館ユーザー」としてログイン
2. サイドバーの「メール管理」をClick
3. 右上の「新規作成」をClick
4. 必要情報を入力して「作成」をClick
5. 一覧から該当のメールの「送信」をClick  
※ 現状、公民館を登録しているユーザー全員にメールが送信されますが、全てダミーのメールアドレスなので送信していただいて問題ありません。  
※ 少しだけ時間がかかりますが、画面を離れても処理は継続され、送信が終わると自動で送信日時が表示されます。

## 概要
（※非商用かつ発注者の許可を得ているため、秘匿情報を隠した形でパブリックリポジトリとして管理しています。）  
フロントエンドはVue２、バックエンド（APIサーバー）はRuby on Railsで記述していますが、フロント部分も含めて単一のRailsプロジェクトにて構成しており、ルーティング以降はフロント側で処理しています。  

また、ユーザー特性として、幅広い年代のユーザーが利用することを想定しているので、画面幅を広く取り文字サイズを大きくするなど、UXの向上を目的にStandaloneを採用しています。
具体的にはスマホ使用時、ブラウザから「ホーム画面に追加」することで、今後VISCOMIを起動する際、ブラウザの検索バーや下部のツールバーを取り払った広い画面で利用することができます。

### フロントのソースコード
基本的にフロントのソースコードは app/javascript/ ディレクトリ配下にまとまっています。
RailsのViewとのエンドポイントであるhello_vue.jsは/packs/hello_vue.js、ステータス管理のVueｘのコードはstore/index.js、Viewは/views、Componentsは/components、vue-routerのルーティングはrouter.jsにあります。

## 主な機能
### 実装済みの機能
 - ユーザー登録
 - 公民館の選択・フォロー
 - 公民館からの投稿の閲覧
 - 管理者による広告の作成、公民館ごとの登録
 - 公民館によるメールの作成、住民への一括送信
 - PWAのStandalone  
 ※現在、実証の都合からメール認証、本人確認を省略し、会員登録情報入力後直接ログイン可能な状態になっています。

### 今後実装することを想定している機能
 - 投稿されたイベントへの参加登録
 - 市民から議会へ直結する「意見箱」

## 使用技術
### 主要技術

| ソフトウェア, ライブラリ等| 用途 |
|:--|:--|
Ruby on Rails | バックエンド処理
Vue.js | DBと連携した動的なレンダリング
Vuetify | Googleの提唱するマテリアルデザインに基づいたUIの実装
ActiveAdmin | DBのCRUDが行える管理者画面の実装
AWS S3 | 画像ファイルのストレージ
Axios | サーバーとの非同期なHTTP通信
Vuex | ユーザー情報などのステート管理
Vue Router | フロント側でのルーティング

### その他, gem
| ソフトウェア, ライブラリ等| 用途 |
|:--|:--|
Heroku | Node環境のデプロイサーバー
Git, GitHub | ソース管理
PostgreSQL | DB
RSpec | テスト
Jbuilder | APIのレスポンス部分のjson成形
CarrierWave | 画像ファイルのアップロード
Rubocop | Lint

## 仕様詳細
### APIについて
運用開始までにはGraphQLでの実装を予定しているため、RESTではない、フロントで必要なデータをフェッチするAPIをあえて残しています。
ex) 公民館の名前のみを返すCommunityCenters#nameや、下書きメールを送信するContacts#sendなど

### ユーザーについて
ユーザーには公民館ユーザーと一般ユーザーがありますが、公民館ユーザーは、一般ユーザーにモデルをアタッチする形で実装しています。  
具体的には、CommunityCenterモデルはbelongs_to :userであり、Userモデルはhas_one :community_centerとなっています。  
公民館ユーザーとして振る舞うユーザーは管理者により公民館ユーザー登録を行ったものです。  

公民館ユーザーになることで、
- 公民館情報の編集
- 投稿の作成、編集、削除  
- メールの一括送信
が可能になります。

認証周辺
- ログイン毎にサーバーでuserに紐づいたトークンを発行し、通信のHeadersにのせて認証を行っています

### 広告について
広告は、自治体ごとにその地域の店舗の広告を登録することを想定しています。ただし、範囲の広い広告などで１：多の関係が形成されることも想定して、広告の登録は関係モデルにより定義しています。  
具体的にはAdRegistryモデルがあり、広告作成時に登録した可変長数の公民館に対して、Ad.ad_registries.createを行うことになります。

## 動作環境
|ソフトウェア | バージョン |
|:--|:--|
Ruby | v2.6.6
Ruby on Rails | v6.0.3.4
Vue.js | v2.6.12
PostgreSQL | v12.5
