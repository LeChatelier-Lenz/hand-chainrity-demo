from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import productRouter, userRouter
from database import init_db

app = FastAPI()

app.include_router(productRouter.router)
app.include_router(userRouter.router)
app.mount("/images", StaticFiles(directory="../backend/public/images"), name="images")

# 允许 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 设置静态文件目录
#app.mount("/images", StaticFiles(directory="backend/public/images"), name="images")
#app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# 在应用启动时创建数据库表
@app.on_event("startup")
def startup():
    init_db()


# 文件上传路由
@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = f"backend/public/images/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        return {"status": "File uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 示例 API 路由
@app.get("/api/config/paypal")
async def get_paypal_config():
    return {"paypal_client_id": os.getenv("PAYPAL_CLIENT_ID")}

# 首页路由
@app.get("/")
async def read_root():
    return {"message": "API is running..."}

# 404 错误处理
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {"detail": exc.detail}

# 启动 FastAPI
if __name__ == "__main__":
    import uvicorn

    init_db()
    uvicorn.run(app, host="0.0.0.0", port=8888)
