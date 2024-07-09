package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		v1.GET("/user/login", controller.UserLogin)
		v1.POST("/user/register", controller.UserRegister)
		v1.GET("/user/getUserInfo", controller.GetUserInfo)
	}
}
