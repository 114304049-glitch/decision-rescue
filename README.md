# 選擇困難救援中心

副標題：**今天吃什麼？** 專注早餐、午餐、晚餐、外送與聚餐的繁體中文 LLM Wiki。AI 在開發環境讀取來源、更新 Markdown 知識與交叉連結；靜態網站呈現內容並提供隨機抽選。第一版不串接 LLM API。

## 現有內容
- 中文 AGENTS.md：AI 工作規則。
- 四類文章模板、知識索引、總覽與追加紀錄。
- 示範文章：先篩餐點、一個人的午餐、多人聚餐、餐點抽選工具說明。
- 架構來源摘要：Karpathy LLM Wiki；不是飲食或營養研究證據。
- 網站：搜尋、分類、文章閱讀、等機率抽選、手機響應式樣式。
- Node.js 建置與檢查、GitHub Pages 工作流程。

此為第一版骨架。生活文章是編輯建議與虛構情境，不冒充研究結論。尚未上傳至 GitHub，也沒有公開網址。

## 第一次正式資料匯入（2026-11-16）
已保存國健署自助餐篇原始 HTML 與來源 metadata，新增來源摘要、自助餐情境指南，並更新午餐文章、篩選方法的關聯連結、索引及總覽。公開網頁只呈現整理內容；原始資料保留在 ZIP 的 raw/，仍依既有設定不提交至公開 GitHub。此例展示新增資料時可沿用模板與網站版型，無須修改網站程式。

## 本機預覽
需 Node.js 22 以上（建議 22 或 24）及 npm。在解壓縮後的專案根目錄執行：
```bash
npm ci
npm run check
npm run dev
```
瀏覽 http://localhost:4173 。按 Ctrl+C 停止。修改 Markdown 後重新啟動預覽，此版沒有熱更新。
也可執行 `npm run build` 後直接開啟 `dist/index.html` 閱讀文章；抽選與搜尋使用 JavaScript 模組，請透過 HTTP 預覽使用，以免受到瀏覽器 file 協定限制。
ZIP 內含建置輸出方便檢視；dist/ 不應加入 Git，工作流程會重新建置。

## 新增內容
1. 複製 templates/ 對應模板至 wiki/ 對應分類，檔名用英文小寫及連字號。
2. 填入真正的日期、標題、摘要、標籤、內容及來源；模板狀態預設 draft。
3. 用相對 Markdown 連結連到相關頁面；sources 欄位也使用相對於本篇的來源摘要路徑。
4. 將文章加入 wiki/index.md，包含摘要與狀態；在 wiki/log.md 追加紀錄。
5. 確認可以公開後，將 status 改成 published（待檢視可用 needs-review）。
6. 執行 npm run check 及 npm run build。

可以直接請 AI：「先讀 AGENTS.md，新增一篇『趕時間的晚餐』的情境指南。缺乏研究來源時標示編輯建議，並同步更新索引、連結與紀錄。」

後續貼上的文章、網址，或要求 AI 搜尋的用餐相關資料，都先保存至 raw/，再由 AI 執行 Ingest。原文與 AI 摘要分開，記錄來源、收錄日期與閱讀範圍。不要把只有網址的資料假裝成已完整閱讀。
查詢預設不保存私人問題；要求保存後才整理成可公開的知識。

## 技術與檢查限制
- markdown-it：轉換 Markdown，禁用原始 HTML。
- yaml：讀取 frontmatter。
- Node.js 內建 HTTP server 與 test runner：預覽與重要邏輯測試。
- 鎖定檔固定依賴版本，使用 npm ci 安裝。

check 檢查必要欄位、日期、章節、分類、索引、連結、來源型別及公開頁連至草稿等問題，並驗證抽選及發布邊界。孤立頁面提示不阻擋建置。
不自動驗證外部網址是否仍有效、事實真偽、研究品質、矛盾、時效、個資與瀏覽器版面，這些需另外閱讀或實測。

Markdown 使用一般段落、標題、清單、程式區塊及標準行內連結。請勿使用 HTML、雙中括號連結、引用式連結或本地圖片（目前檢查與資源輸出未支援）。新增語法支援時同步更新檢查器。

## 上傳 GitHub 與啟用 Pages
1. 在 GitHub 建立空白儲存庫，例如 decision-rescue-wiki。
2. 以 Git 上傳整個專案的可追蹤檔案；勿提交 node_modules/、dist/、raw/ 私人資料或金鑰。網頁手動上傳時要留意隱藏的 .github/ 目錄與 .gitignore，建議用 Git。
3. 主分支使用 main；如果名稱不同，同步修改 pages.yml 的分支設定。
4. 到儲存庫 Settings → Pages，將發布來源選為 GitHub Actions。
5. 在 Actions 手動執行 Publish Wiki to GitHub Pages，或推送到 main。
6. 成功後使用工作流程回傳的網址，不猜測或冒稱已部署。

第一次推送可在建立遠端儲存庫後依 GitHub 畫面提供的指令設定 remote。推送前用 `git status --short` 與 `git ls-files` 檢查實際清單。忽略規則不會清除已追蹤的檔案。

## 公開邊界
只輸出 published/needs-review 文章、首頁、總覽與 src/ 靜態資源；不公開 raw/、log.md、索引原稿、模板、AGENTS.md 或 README.md 到網站。這些規則與開發檔仍可在公開 GitHub 儲存庫被閱讀，勿在其中寫私人內容。

raw/README.md 是可提交的目錄說明，其餘 raw/ 預設忽略。新增來源先記錄書目與摘要，不隨意公開他人全文。

## 架構參考
[Andrej Karpathy — LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)。本專案自行設計具體目錄、文章模板與網站實作。

## 第二次資料匯入（2026-11-16）
加入國健署早餐篇與便利商店篇，保存兩份原始 HTML 及 metadata，新增兩篇來源摘要和兩篇情境指南；更新相關文章、索引、總覽與紀錄。沿用原有模板與程式，沒有為新文章重新設計網站。

同次新增食藥署外食選擇攻略，保存原始資料並建立來源摘要與選店衛生指南；連結多人聚餐與便利商店情境。

## Wiki 筆記與簡報技能
專案技能位於 `skills/wiki-notes-slides/SKILL.md`；包含來源規則、三階段流程、兩份 Markdown 模板、設計與 LaTeX 規格、驗收清單及三張確認過的視覺參考。
範例指令：「先讀 AGENTS.md 與 skills/wiki-notes-slides/SKILL.md，只依 Wiki 比較早餐與便利商店選餐，存成 notes，另搜尋待收錄文獻。」
`notes/`、`slides/`、`presentations/` 已有索引入口，目前沒有正式研究筆記或簡報。這是隨專案保存的技能文件，未安裝至個人技能目錄。LaTeX、簡報控制與公開發布仍須在實際製作時開發與驗證。
