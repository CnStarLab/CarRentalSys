package routes

import (
	"carRentalSys/controller"
	"carRentalSys/middleware"

	"github.com/gin-gonic/gin"
)

// @title Swagger Example API
// @version 1.0
// @description Car Management and Searching API
// @host localhost:8080
// @BasePath /api/v1
func CarRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/cars/all", middleware.JWTAuth(), controller.GetAllCars) //Get all cars info in `Car` table.
		v1.POST("/cars/carId/:id", controller.GetCarByCarId)
		v1.GET("/cars/ownerId/:id", controller.GetCarByOwnerId)
		v1.GET("/cars/invalidDate/:id", controller.GetCarInvalidDate) //Get a car's invalid date range.
		v1.GET("/cars", controller.GetCarsWithConds)
		v1.GET("/cars/getComment")                                                              //Get a car's all comment.
		v1.POST("/cars/searchAvail")                                                            //Search the avil car with some condition.
		v1.POST("/cars/info/createCarBasic", middleware.JWTAuth(), controller.CreateCarsByUser) //Add a new car for renting from a user
		v1.POST("/cars/info/update/:id", middleware.JWTAuth(), controller.UpdateCarInfo)
		v1.POST("/cars/info/avail/set", middleware.JWTAuth(), controller.SetCarAvailByOwner) //Set if the car is visable for users. || prvilage: carOwner+
	}
}
