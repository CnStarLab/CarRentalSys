package controller

import (
	"fmt"
	"image"
	"image/jpeg"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// @Summary Upload a photo
// @Description Upload a photo to the server
// @Tags Upload
// @Accept multipart/form-data
// @Produce plain
// @Param photo formData file true "Photo to upload"
// @Success 200 {string} string "Uploaded successfully"
// @Failure 400 {string} string "Bad request"
// @Failure 500 {string} string "Error getting current working directory"
// @Failure 500 {string} string "Error saving file"
// @Router /api/v1/upload/pic [post]
func UploadPic(c *gin.Context) {
	file, err := c.FormFile("photo")
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	filename := file.Filename

	wd, err := os.Getwd() //[WIP] using global env storage current workdir
	if err != nil {
		c.String(http.StatusInternalServerError, "Error getting current working directory")
		return
	}
	fmt.Println("Current working directory:", wd)

	// relative path
	savePath := filepath.Join(wd, "../../../", "uploads", filename)
	err = c.SaveUploadedFile(file, savePath)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error saving file")
		return
	}

	// 在这里添加照片处理逻辑，例如图像缩放、滤镜等
	processPhoto(savePath)

	c.String(http.StatusOK, "Uploaded successfully")
}

// @Summary Get a photo
// @Description Get a photo by filename
// @Tags Upload
// @Accept json
// @Produce image/jpeg
// @Param filename path string true "Photo filename"
// @Success 200 {file} file "Photo file"
// @Failure 404 {string} string "Photo not found"
// @Failure 500 {string} string "Error getting current working directory"
// @Failure 500 {string} string "Error reading file"
// @Router /api/v1/upload/pic/{filename} [get]
func GetPhoto(c *gin.Context) {
	wd, err := os.Getwd() //[WIP] using global env storage current workdir
	if err != nil {
		c.String(http.StatusInternalServerError, "Error getting current working directory")
		return
	}

	filename := c.Param("filename")
	filePath := filepath.Join(wd, "../../../", "uploads", filename)

	// check exist
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.String(http.StatusNotFound, "Photo not found")
		return
	}

	fileBytes, err := os.ReadFile(filePath)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error reading file")
		return
	}

	c.Data(http.StatusOK, "image/jpeg", fileBytes)
}

func processPhoto(filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		fmt.Println("Error decoding image:", err)
		return
	}

	// [WIP] Add more logic here (Photo compression, resize, adjust, etc)
	outFile, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer outFile.Close()

	jpeg.Encode(outFile, img, nil)
}
