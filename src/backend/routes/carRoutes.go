package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func CarRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/cars/getAll", controller.GetAllCars) //Get all cars info in `Car` table.
		v1.POST("/cars/getCarById/:id", controller.GetCarById)
		v1.GET("/cars/getComment")                                        //Get a car's all comment.
		v1.POST("/cars/searchAvail")                                      //Search the avil car with some condition.
		v1.POST("/cars/info/createCarBasic", controller.CreateCarsByUser) //Add a new car for renting from a user
		v1.POST("/cars/info/update/:id", controller.UpdateCarInfo)
	}
}
