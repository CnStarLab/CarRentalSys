package routes

import (
	"carRentalSys/controller"

	"github.com/gin-gonic/gin"
)

func BookingRoutes(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		v1.GET("/service/info/bookId/:id", controller.GetBookInfoByBookId)    //Get Booking Info by bookId
		v1.GET("/service/info/ownerId/:id", controller.GetBookInfoByOwnerId)  //get book info with OwnerId
		v1.POST("/service/user/bookCar", controller.BookNewCar)               //Book a new car.
		v1.POST("/service/user/returnCar", controller.ReturnCar)              //Return a car.
		v1.POST("/service/user/addComment")                                   //Add comment for a car.
		v1.POST("/service/user/add2Favorite")                                 //Add this car to favorite list.
		v1.POST("/service/owner/addComment")                                  //Add comment to user from car owner.
		v1.POST("/service/owner/confirmRequest")                              //Confirm this rent request for owner.
		v1.POST("/service/status/approve/:id", controller.ApproveBookRequest) //Car owner approver request
		v1.POST("/service/status/decline/:id", controller.DeclineBookRequest) // Car owner declines request
	}
}
