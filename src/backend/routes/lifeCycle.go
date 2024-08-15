package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func LifeCycleRoutes(router *gin.Engine) {

	router.GET("/health", controller.CheckHealth) //Get Booking Info by bookId
}
