package routes

import (
	"carRentalSys/controller"
	"carRentalSys/middleware"

	"github.com/gin-gonic/gin"
)

// @title Swagger Example API
// @version 1.0
// @description Renting Service API
// @host localhost:8080
// @BasePath /api/v1
func BookingRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/service/info/bookId/:id", controller.GetBookInfoByBookId)             //Get Booking Info by bookId
		v1.GET("/service/info/ownerId/:id", controller.GetBookInfoByOwnerId)           //get book info with OwnerId
		v1.GET("/service/info/userId/:id", controller.GetBookInfoByUserId)             //get book info with OwnerId
		v1.POST("/service/user/bookCar", middleware.JWTAuth(), controller.BookNewCar)  //Book a new car.
		v1.POST("/service/user/returnCar", controller.ReturnCar)                       //Return a car.
		v1.POST("/service/user/addComment")                                            //Add comment for a car.
		v1.POST("/service/user/add2Favorite")                                          //Add this car to favorite list.
		v1.POST("/service/owner/addComment")                                           //Add comment to user from car owner.
		v1.POST("/service/owner/confirmRequest")                                       //Confirm this rent request for owner.
		v1.POST("/service/status/approve/:id", controller.ApproveBookRequest)          //Car owner approver request
		v1.POST("/service/status/decline/:id", controller.DeclineBookRequest)          // Car owner declines request
		v1.POST("/service/user/status/decline/:id", controller.UserDeclineBookRequest) // Car owner declines request
	}
}
