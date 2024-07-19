package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func UploadRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.POST("/upload/test", controller.UploadTest)       //Request for user login
		v1.GET("/upload/pic/:filename", controller.GetPhoto) // Get pic with picname
	}
}
