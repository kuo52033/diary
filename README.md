<a href="https://determined-yalow-f69948.netlify.app/posts"><p align="center"><img src="https://res.cloudinary.com/dhawohjee/image/upload/v1648186659/diary/logo1_ggvdpl.png" /></p></a>
<h2 align="center"><a href="https://determined-yalow-f69948.netlify.app/posts">Demo</a></h2>

## 描述
一個簡易的小型社群網站，註冊帳號密碼後，提供發文、案讚以及收藏貼文等功能，修改個人資訊(生日、簡介、學歷...等等)供他人觀看，密碼能夠隨時修改，也可以在他人貼文下留下評論。


![Diary](https://res.cloudinary.com/dhawohjee/image/upload/v1648452354/diary/diary_ifmpcz.png "Diary")

## 技術

### Front-end

* 使用 React 撰寫。
* Material-UI 提供龐大的元件，簡易的設計出使用者介面。
* React-Router-Dom 實現出前端路由。
* React-Redux 來管理在前端一些複雜的狀態，React-Thunk 來處理非同步的函示。
* Axios 做為跟後端 Endpoint 發送請求的工具。
* Formik 搭配驗證函示庫 Yup 讓表單的操作更為簡單並容易維護。
* Moment js 提供時間處理。
* 使用 Netlify 服務來佈屬前端網頁。

### Back-end

* 後端使用 Node 撰寫，資料庫使用 MongoDB 儲存資料。
* Express 提供 Web 應用程式架構來建立伺服器。
* 透過 JWT(JsonWebToken) 來驗證使用者帳密並將 Token 回傳前端。
* 使用 Multer 來處理上傳的圖片到 Cloudinary。
* Router Middleware 處理請求，並抓取資料庫資料回傳。
* Heroku 服務來佈屬後端伺服器。

## 主要功能

### 上傳
![upload](https://res.cloudinary.com/dhawohjee/image/upload/v1648470278/diary/Diary_-_Google_Chrome_2022-03-28_20-20-37_AdobeCreativeCloudExpress_wzgvuj.gif)

### 留言
![message](https://res.cloudinary.com/dhawohjee/image/upload/v1648471399/diary/Diary_-_Google_Chrome_2022-03-28_20-40-46_AdobeCreativeCloudExpress_xdhnvh.gif)

### 修改資料
![change](https://res.cloudinary.com/dhawohjee/image/upload/v1648471888/diary/Diary_-_Google_Chrome_2022-03-28_20-49-21_AdobeCreativeCloudExpress_bokiwa.gif)

## 使用

```
npm install
npm run start
```






 
