package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.
// @host      localhost:8080
// @BasePath  /api/v1
func UserRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/user/login", controller.UserLogin)
		v1.POST("/user/register", controller.UserRegister)
		v1.GET("/user/getUserInfo", controller.GetUserInfo)
	}
}
