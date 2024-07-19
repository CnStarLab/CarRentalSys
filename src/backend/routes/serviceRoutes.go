package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func BookingRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.POST("/service/user/bookCar", controller.BookNewCar)
		v1.POST("/service/user/returnCar", controller.ReturnCar)
		v1.POST("/service/user/addComment")
		v1.POST("/service/user/add2Favorite")
		v1.POST("/service/owner/addComment")
		v1.POST("/service/owner/confirmRequest")
	}
}
