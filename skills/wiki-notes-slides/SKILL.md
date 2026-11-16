---
name: wiki-notes-slides
description: 依「今天吃什麼」專案 Wiki 製作有來源的研究筆記、逐頁簡報稿與暖白編輯風 HTML 簡報。當使用者要求以 Wiki 回答問題並保存 notes、研究整理、簡報大綱或 HTML 簡報時使用；另搜尋待收錄文獻，但不將新文獻內容混入正文。
---

# Wiki 筆記與簡報

先讀專案根目錄 AGENTS.md、wiki/index.md、近期 wiki/log.md，再閱讀相關 Wiki 正文與來源摘要。以下路徑均相對專案根目錄，資源連結則相對本技能目錄。

## 來源界線
- 正文、逐頁稿、講者備註、表格與公式只使用已存在 Wiki 的內容。可以摘要、重組與比較，不新增外部事實或 Wiki 未支持的推論。
- 保留「來源支持、編輯建議、虛構範例、待確認」性質，不把生活建議升格為研究結論。
- raw/ 尚未 Wiki 化的資料、新搜尋文獻、AI 背景知識均不得作正文依據。衍生成果不自動成為 Wiki 證據。
- 只使用 published 頁面；needs-review 頁面如必須使用，保留待確認標示；draft 不作正式結論。
- 知識不足、矛盾或缺少公式時，明確記錄，不以搜尋結果補正文。

## 工作流程
1. 確認問題、受眾與要求的階段。使用者只要 notes 時，完成 notes；只要風格討論時不產生研究成果。要求整套成果時可連續執行，不重複要求已給的授權。
2. 決定英文小寫連字號 topic slug；同主題沿用 slug。建立版本 v001，後續新增 v002，不覆寫已交付版本。
3. 依 [notes 模板](assets/notes-template.md)撰寫 notes/<topic>/v001/notes.md。記錄 Wiki 檔案、updated 日期及版本指紋；有 Git 用 commit，尚未有 Git 或工作目錄有修改時加記使用檔案的 SHA-256。
4. 上網找相關資料，核對作者、標題、年份、連結與閱讀範圍。只列在 notes 最後「建議文獻｜尚未納入 Wiki」。優先官方、原始研究或第一手資料；沒有適合資料就說明，不硬湊。
5. 提供真實可用的直接 PDF／檔案連結；若只有網頁，標示「原文網頁」，不可假稱下載 PDF。不能保證跨站連結點擊必定強制下載，瀏覽器也可能開啟預覽。
6. 新文獻如已取得原文，保存至 raw/ 並附 metadata，標示 pending-ingest；下載不等於已進入 Wiki。依使用者後續指定執行 AGENTS.md 的 Ingest，完成後才可納入新版 notes。
7. 依 [逐頁稿模板](assets/outline-template.md)建立 slides/<topic>/v001/outline.md。每頁記錄主要訊息、顯示文字、視覺方式、講者備註、notes 章節與 Wiki 來源。未收錄文獻只能在末尾後續閱讀區，不進入主要論證。
8. 讀 [設計規格](references/design.md)及 [HTML 與 LaTeX 規格](references/html-math.md)，產生 presentations/<topic>/v001/index.html 與必要 assets/。先讓逐頁稿成為內容依據，再處理視覺；改論點時先改 notes、逐頁稿。
9. 依 [驗收清單](references/checklist.md)驗證，更新 notes/index.md、slides/index.md、presentations/index.md 與 wiki/log.md 的衍生產物紀錄。一般研究筆記不列入 wiki/index.md 的知識文章清單。
10. 回報完成階段、來源、驗證結果、限制及交付位置。不得將規格文件視為功能已實作。

## 預設與發布
- 若未指定頁數，按內容需要採一頁一個核心訊息，避免為湊頁數擴寫。
- 新增 notes 與逐頁稿預設只保存在專案；是否公開依當次指示。不得自行公開私人問題。
- HTML 發布須接入建置白名單並實測 GitHub Pages 子路徑；目前專案 build 尚未處理 presentations/，不能聲稱放進資料夾就已上線。
- 本技能是專案內規則，由 AGENTS.md 指引讀取；不等同已安裝的個人技能或已串接的自動化服務。
