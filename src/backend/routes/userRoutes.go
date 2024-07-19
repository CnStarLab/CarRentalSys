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
		v1.POST("/user/login", controller.UserLogin)        //Request for user login
		v1.POST("/user/register", controller.UserRegister)  //Request for register a new user
		v1.POST("/user/updateProfile")                      //Update a user's profile
		v1.POST("/user/getComments")                        //Get all comments of a user
		v1.GET("/user/getUserInfo", controller.GetUserInfo) //Get a user's all profile
	}
}
