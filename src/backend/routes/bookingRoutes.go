package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func BookingRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.POST("/service/bookCar", controller.BookNewCar)
		v1.POST("/service/returnCar", controller.ReturnCar)
	}
}
