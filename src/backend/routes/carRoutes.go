package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func CarRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/cars/getAll", controller.GetAllCars)
		v1.POST("/cars/addCar", controller.AddCarsByUser)
	}
}
